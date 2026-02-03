const express = require('express')
const isAdmin = require('../../Middleware/isAdmin')               
const { FetchSpecificProduct, AddorEditProduct, ProductActiveHandle } = require('../../Controller/Admin/AdminProductController')
const route = express.Router()

route.get("/productDetails/:id",isAdmin,FetchSpecificProduct)
route.post("/productEditORAdd",isAdmin,AddorEditProduct)
route.patch("/productUpdate/:id",isAdmin,ProductActiveHandle)
module.exports = route