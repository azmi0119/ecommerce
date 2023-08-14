const bcryptjs = require("bcrypt")

// bcypt password 
module.exports.securePassword = async(password)=> {
	try {
		const passwordHash = await bcryptjs.hash(password, 5)
		return passwordHash
	} catch(error) {
		res.status(400).send(error.message)
	}
}

