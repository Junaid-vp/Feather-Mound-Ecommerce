const productsModel = require("../Models/productsModel");

const getAllProductsORbytype = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }
    const productsData = await productsModel.find(filter);
    if (productsData.length === 0) {
      return res.status(404).json({ Message: " No Products " });
    }
    console.log("Product Get Successfully");
    res
      .status(200)
      .json({ message: `Products Get Successfully`, Products: productsData });
  } catch (e) {
    res.status(500).json({ message: "Products Fetching Error In Server" ,Error : e.message});
  }
};

// const getProductsbyType = async (req, res) => {
//   try {
//     const { type } = req.query;
//     const productsDatabytype = await productsModel.find({ type: type });
//     if(productsDatabytype.length === 0){
//         return res.status(404).json({Message : `${type} Not Available`})
//     }

//     console.log(`Type:${type} Products Successfully Got it`);
//     res.status(200).json({
//       message: `Product Type : ${type}`,
//       Products: productsDatabytype,
//     });

//   } catch (e) {
//     res.status(500).json({ message: "Type Products Fetching Error in Server" });
//   }
// };

const getProductbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const productsDatabyid = await productsModel.findById({ _id: id });
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

// getProductsbyType
module.exports = { getAllProductsORbytype, getProductbyId };
