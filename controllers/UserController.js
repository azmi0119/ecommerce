// Required user model 
const User = require("../models/User")
const Common = require("../helper/common")
const bcryptjs = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config/config")

module.exports.store = async(req, res)=> {
	try { 
		let HasPassword = await Common.securePassword(req.body.password)
		let user = new User({
			name : req.body.name,
			email : req.body.email,
			password : HasPassword,
			image : req.file.filename,
			mobile : req.body.mobile,
			type : req.body.type
		})

		// Check data exist or not 
		const userData = await User.findOne({email : req.body.email})
		if(!userData) {
			let data = await user.save();
			res.status(200).json({
				success : true,
				message : "Data are saved successfully !", 
				data : data
			})
		} else {
			res.status(400).json({
				message : "This email already exists !"
			})
		}
	} catch(error) {
		res.status(200).json(error.message)
	}
}

// Create Token 
const jwtToken = async(id) => {
	try {
		const token = await jwt.sign({ _id : id }, config.secrete_key)
		return token;
	} catch(error) {
		res.status(400).send(error.message)
	}
}

// Create API for login 
module.exports.login = async(req, res)=> {
	try {
		const userData = await User.findOne({ email : req.body.email })
		if(userData) {
			const passworMatch = await bcryptjs.compare(req.body.password, userData.password)
			if(passworMatch) {
				// Call jwtToken method 
				const tokenData = await jwtToken(userData._id)
				const userResult = {
					_id : userData._id, 
					name : userData.name, 
					email : userData.email, 
					password : userData.password, 
					image : userData.image, 
					mobile : userData.mobile, 
					type : userData.type,
					token  : tokenData
				}
				const response = {
					success : true,
					message : "User all details",
					data : userResult
				}
				res.status(200).json(response)
			} else {
				res.status(200).json({ success : false, message : "Email are not correct !" })	
			}
		} else {
			res.status(200).json({ success : false, message : "Email are not correct !" })
		}
	} catch(error) {
		res.status(500).send(error.message)
	}
}

// Update password 
module.exports.passwordUpdate = async(req, res) => {

	const user_id = req.body.user_id
	const password = req.body.password

	const user = await User.findOne({ _id : user_id })
	if(user) {
 		const newPassword = await Common.securePassword(password)
 		const userData = await User.findByIdAndUpdate({ _id : user_id}, {$set : {
 			password : newPassword
 		} })

 		res.status(200).send({ success : true, message : "Your password has been update successfully"})
	} else {
		return res.status(200).send({ success :  false, message : "User are not found !"})
	}
}