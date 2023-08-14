const jwt = require('jsonwebtoken')
const config = require('../config/config')


const verifyToken = async(req, res, next)=> {

	const token = req.body.token || req.query.token || req.headers['authorization']
	if(!token) {
		res.status(400).send({success : false, message : "Token is required for authentication !"})
	}

	try {
		const tokenDecode = await jwt.verify(token, config.secrete_key)
		req.user = tokenDecode
	} catch(err) {
		res.status(400).send('Invalid Access token !!')
	}

	return next()
}


module.exports = verifyToken