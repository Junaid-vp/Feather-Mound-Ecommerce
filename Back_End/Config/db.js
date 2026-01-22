const mongoose =  require("mongoose");
require('dotenv').config()


// Connecting DataBase

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("DATABASE SUCCESSFULLY CONNECTED");
        
    }catch(e){
        console.log("CONNECTION IS FAIL:",e.message)
        process.exit(1)
    }
}

module.exports = connectDB
