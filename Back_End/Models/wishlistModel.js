const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    items:[
        {
           product:{
             type:mongoose.Schema.Types.ObjectId,
                ref:"products"
           }
        }
    ]
},
{ timestamps: true }
)


const wishlistModule = mongoose.model("Wishlist",wishlistSchema)

module.exports =  wishlistModule