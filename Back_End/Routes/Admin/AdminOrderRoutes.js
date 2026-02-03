const express = require('express')
const isAdmin = require('../../Middleware/isAdmin')               
const {specificUserOrderList, FetchAllordersList, UpdateOrderStatus} = require('../../Controller/Admin/AdminOrderController')
const route = express.Router()

route.get("/",isAdmin,FetchAllordersList)
route.get("/userOrder/:id",isAdmin,specificUserOrderList)
route.post("/orderStatus/:id",isAdmin,UpdateOrderStatus)
module.exports = route