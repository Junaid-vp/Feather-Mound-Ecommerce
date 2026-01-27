const jwt =require("jsonwebtoken")
require('dotenv').config()
const GenrateToken = async(email,userID,role)=>{

const RefreshToken = await jwt.sign({Email:email,Id:userID,user:role},process.env.REFRESH_TOKEN_KEY,{
    expiresIn: "10m"
})

const AccessToken = await jwt.sign({Email:email,Id:userID,user:role},process.env.ACCESS_TOKEN_KEY,{
    expiresIn: "5m"
})

 return {RefreshToken,AccessToken}

}


module.exports = GenrateToken