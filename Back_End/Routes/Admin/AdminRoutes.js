const express = require('express')
const isAdmin = require('../../Middleware/isAdmin')
const { FetchAllUser, AdminBlockTheUser } = require('../../Controller/Admin/AdminUserController')


               
const route = express.Router()


route.get("/usersList",isAdmin,FetchAllUser)
route.patch("/blockORunblock/:_id",isAdmin,AdminBlockTheUser)



module.exports = route