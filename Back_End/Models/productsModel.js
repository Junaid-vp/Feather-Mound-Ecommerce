const mongoose =  require("mongoose");

const ProductsSchema = mongoose.Schema(  {
      product_id: String,
      name: String,
      type: String,
      color: String,
      original_price: Number,
      sale_price: Number,
      discount_percentage: Number,
      image_url: String,
      description: String,
      cost_price: Number,
      isActive:Boolean
    },)


module.exports =  mongoose.model("products",ProductsSchema)