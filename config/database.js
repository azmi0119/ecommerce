require("dotenv").config();
const mongoose = require("mongoose")
// Database connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
}).then( ()=> {
	console.log("Database connection sucessfully stablished !")
}).catch( (err) => {
	console.log("Sorry ! Database connection failed !")
})