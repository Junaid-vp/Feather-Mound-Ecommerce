const express = require('express')
const { getCartItems, addTocart,removeFromcart, increaseQuantity, decraseQuantity } = require('../Controller/cartController')
const protectRoutes = require('../Middleware/protectRouter')
const route = express.Router()


route.get("/",protectRoutes,getCartItems)
route.post("/add/:productId",protectRoutes,addTocart)
route.patch("/remove/:productId",protectRoutes,removeFromcart)
route.patch('/increase/:productId',protectRoutes,increaseQuantity)
route.patch('/decrease/:productId',protectRoutes,decraseQuantity)

module.exports = route