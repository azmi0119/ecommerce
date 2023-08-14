const express = require("express")
const app = express()
const userRouter = require('./routes/web')
const database = require("./config/database")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended : true }))
app.use(bodyParser.json())

app.use('/user', userRouter)

// start server
app.listen("5000", ()=> {
	console.log("Server has been started successfully !")
})