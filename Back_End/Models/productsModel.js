const mongoose =  require("mongoose");
const { string } = require("zod");

const ProductsSchema = mongoose.Schema(  {
      product_id: String,
      name: String,
      type: String,
      original_price: Number,
      sale_price: Number,
      discount_percentage: Number,
      image_url: String,
      description: String,
      id:String,
      cost_price: Number,
      isActive:Boolean
    },)



    const productsModel =  mongoose.model("products",ProductsSchema)


    module.exports = productsModel