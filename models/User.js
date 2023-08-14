const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name : {
		type : String, 
		required : true
	}, 
	email : {
		type : String,
		required : true
	},
	password : {
		type : String, 
		required : true
	}, 
	mobile : {
		type : String, 
		required : true
	},
	image : {
		type :String,
		required : true
	},
	type : {
		type : String,
		required : true
	}
})

const user = new mongoose.model('User', userSchema)
module.exports = user