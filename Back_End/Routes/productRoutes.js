const express = require('express')
const { getAllProductsORbytype, getProductbyId } = require('../Controller/ProductsController')
const route = express.Router()

route.get("/",getAllProductsORbytype)
// route.get("/",getProductsbyType)
route.get("/:id",getProductbyId)
       

module.exports = route  