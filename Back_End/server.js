const express = require('express')
const connectDB = require('./Config/db.js')
const cookieParser = require('cookie-parser')
const route = require('./Routes/userRoutes.js')

const app = express()

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/auth',route)

connectDB()

app.listen(process.env.PORT,()=>{
    console.log("Server Running Sucessfully",process.env.PORT)
})

