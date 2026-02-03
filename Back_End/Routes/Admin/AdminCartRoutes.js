const express = require('express')
const isAdmin = require('../../Middleware/isAdmin')               
const AdminCartController = require('../../Controller/Admin/AdminCartController')
const route = express.Router()

route.get("/userCart/:id",isAdmin,AdminCartController)

module.exports = route