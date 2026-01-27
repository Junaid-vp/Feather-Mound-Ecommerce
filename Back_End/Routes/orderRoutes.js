const express = require('express')
const protectRoutes = require('../Middleware/protectRouter')
const {  showOrderList, orderSingleProduct, orderCartProduct, orderCancelController } = require('../Controller/orderController')
const route = express.Router()


route.get('/',protectRoutes,showOrderList)
route.post('/single',protectRoutes,orderSingleProduct)
route.post('/cart',protectRoutes,orderCartProduct)
route.patch('/cancel',protectRoutes,orderCancelController)

module.exports = route