const productsModel = require("../Models/productsModel");

const getAllProductsORbytype = async (req, res) => {
  try {
    const { type,name,limit } = req.query;

    const filter = {};
    
    if(type){
        filter.type=type
      }
    if(name && name.trim() !== ""){
        filter.name = {$regex:`^${name}`,$options:"i"}
      }
     
    const productsData = await productsModel.find(filter).limit(limit ? Number(limit) : 0).lean()
    const totalCount = await productsModel.countDocuments(filter);
   
    res
      .status(200)
      .json({ message: `Products Get Successfully`, Products: productsData ,Count:totalCount});
  } catch (e) {
    res.status(500).json({ message: "Products Fetching Error In Server" ,Error : e.message});
  }
};




const getProductbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const productsDatabyid = await productsModel.findById({ _id: id }).lean()
    if (!productsDatabyid) {
      return res
        .status(404)
        .json({ Message: `No Product By This Id No: ${id}` });
    }

    res
      .status(200)
      .json({
        Message: "Successfull Product Get By Id",
        Product: productsDatabyid,
      });
  } catch (e) {
    res.status(500).json({ Message: e.message });
  }
};


module.exports = { getAllProductsORbytype, getProductbyId };
