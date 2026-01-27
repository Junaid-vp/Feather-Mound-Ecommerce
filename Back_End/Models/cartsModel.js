const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    items:[
        {
           product:{
             type:mongoose.Schema.Types.ObjectId,
                ref:"products"
           },
           quantity:{
            type:Number,
            default:1,
            require:true
           }
        }
    ]
    
},
{ timestamps: true })


const cartModule = mongoose.model("cart",cartSchema)

module.exports = cartModule