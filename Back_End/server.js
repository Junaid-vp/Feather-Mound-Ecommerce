const express = require('express')
const connectDB = require('./Config/db.js')
const cookieParser = require('cookie-parser')
const userRoute = require('./Routes/userRoutes.js')
const productRoute = require('./Routes/productRoutes.js')
const cartRoute = require('./Routes/cartRoutes.js')
const wishlistRoute = require('./Routes/wishlistRoutes.js')
const orderRoute = require('./Routes/orderRoutes.js')
const cors = require('cors')
const app = express()

app.use(cors({
origin:"http://localhost:5173",
credentials: true
}))

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/auth',userRoute)
app.use('/api/products',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/wishlist',wishlistRoute)
app.use('/api/order',orderRoute)

connectDB()


app.listen(process.env.PORT,()=>{
    console.log("Server Running Sucessfully",process.env.PORT)
})


