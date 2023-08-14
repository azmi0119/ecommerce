const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const multer = require("multer")
const path = require("path")
const auth = require('../middleware/auth')

// file upload code 
const storage = multer.diskStorage({
	destination : function (req, file, cb) {
		cb(null, 'uploads', (error, sucess)=> {
			if(error) throw error
		})
	},
	filename : (req, file, cb)=> {
		const name = Date.now() + '_' + file.originalname;
		cb(null, name, (error1, sucess1)=> {
			if(error1) throw error1
		})
	}
});

const upload = multer({ storage : storage }) 
  
router.post("/store", upload.single('image'), UserController.store)
router.post("/login", UserController.login)
router.get("/test", auth, function(req, res) { 
	res.status(200).send({ success : true, message : 'Authenticated successfully !' })
})
router.post('/update-password', auth, UserController.passwordUpdate)

module.exports = router 