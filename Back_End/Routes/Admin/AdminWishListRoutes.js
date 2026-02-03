const express = require('express')
const isAdmin = require('../../Middleware/isAdmin')               
const AdminWishController = require('../../Controller/Admin/AdminWishListController')
const route = express.Router()

route.get("/userWishList/:id",isAdmin,AdminWishController)

module.exports = route