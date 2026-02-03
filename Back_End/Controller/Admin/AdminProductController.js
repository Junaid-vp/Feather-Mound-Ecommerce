const productsModel = require("../../Models/productsModel");

const FetchSpecificProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const err = new Error("No product Id");
      err.status = 400;
      throw err;
    }

    const product = await productsModel.findById(id);

    if (!product) {
      const err = new Error("No product Found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ Status: "Success", Product: product });
  } catch (e) {
    res.status(e.status || 500).json({ Error: e.message });
  }
};

const AddorEditProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const { product } = req.body;
    if (!product) {
      const err = new Error("No product Details");
      err.status = 400;
      throw err;
    }
    if (id) {
      await productsModel.findByIdAndUpdate(id, product, { new: true });
      return res
        .status(200)
        .json({ Status: "Success", Message: "Product Updated SuccessFully" });
    }

    await productsModel.create(product);
    return res
      .status(201)
      .json({ Status: "Success", Message: "Product Added SuccessFully" });
  } catch (e) {
    res.status(e.status || 500).json({ Error: e.message });
  }
};

const ProductActiveHandle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ Error: "No product Id" });
    }

    const product = await productsModel.findById(id);

    if (!product) {
      return res.status(404).json({ Error: "No product Found" });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      Status: "Success",
      Message: "Product status updated successfully",
      isActive: product.isActive,
    });
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};

module.exports = {
  FetchSpecificProduct,
  AddorEditProduct,
  ProductActiveHandle,
};
