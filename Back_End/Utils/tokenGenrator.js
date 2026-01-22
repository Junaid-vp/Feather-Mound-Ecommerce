const jwt =require("jsonwebtoken")
require('dotenv').config()
const GenrateToken = async(email,userID)=>{

const RefreshToken = await jwt.sign({Email:email,Id:userID},process.env.REFRESH_TOKEN_KEY,{
    expiresIn: "7d"
})

const AccessToken = await jwt.sign({Email:email,Id:userID},process.env.ACCESS_TOKEN_KEY,{
    expiresIn: "15m"
})

 return {RefreshToken,AccessToken}

}


module.exports = GenrateToken