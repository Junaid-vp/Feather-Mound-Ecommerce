
const express = require('express')
const protectRoutes = require('../Middleware/protectRouter')
const { getWishListData, WishlistToggle } = require('../Controller/wishlistController')
const route = express.Router()


route.get("/",protectRoutes,getWishListData)
route.patch("/:productID",protectRoutes,WishlistToggle)



module.exports = route