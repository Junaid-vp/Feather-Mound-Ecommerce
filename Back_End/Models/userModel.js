const mongoose =  require("mongoose");

const userSchema = mongoose.Schema({
  role: {
    default:"user",
    enum:['user','admin'],
    type:String,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 6 , select: false  },
  address: {
    name: String,
    number: Number,
    pinCode: Number,
    locality: String,
    address: String,
    city: String,
    state: String,
  },
  isBlock: {
    default:false,
    type:Boolean
  }
},{timestamps : true});

const userModel=mongoose.model("Users",userSchema)
module.exports = userModel