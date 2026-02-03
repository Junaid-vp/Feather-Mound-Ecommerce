const express = require('express')
const protectRoutes = require('../Middleware/protectRouter')
const {  showOrderList, orderSingleProduct, orderCartProduct, orderCancelController } = require('../Controller/orderController')
const verifyPayment = require('../Utils/PaymentVerify')
const route = express.Router()


route.get('/',protectRoutes,showOrderList)
route.post('/single',protectRoutes,orderSingleProduct)
route.post('/cart',protectRoutes,orderCartProduct)
route.patch('/cancel',protectRoutes,orderCancelController)
route.post("/verify-payment",verifyPayment)
module.exports = route
