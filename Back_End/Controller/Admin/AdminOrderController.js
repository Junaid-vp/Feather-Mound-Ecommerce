const { default: mongoose } = require("mongoose");
const orderModule = require("../../Models/orderModels");

const specificUserOrderList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("No user Id");
      err.status = 400;
      throw err;
    }
    const OrderData = await orderModule
      .find({ user: id })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .lean();

    if (OrderData.length === 0) {
      const err = new Error("Order is Empty");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ orderData: OrderData, status: "success" });
  } catch (e) {
    res.status(e.status || 500).json({ Error: e.message });
  }
};

const FetchAllordersList = async (req, res) => {
  try {
    const { name,status } = req.query;
    const filter ={}
    if(status){
      filter.orderStatus = status
    }

    const orders = await orderModule
      .find(filter)
      .populate({
        path: "user",
        match: name ? { firstName: { $regex: name, $options: "i" } } : {},
      })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .lean();

   const AmountStatus = await orderModule.aggregate([
  {
    $group:{
      _id:null,
      Paid:{
        $sum:{
          $cond:[{$eq:["$paymentStatus","Paid"]},"$totalAmount",0]
        }
      },
      Pending:{
        $sum:{
          $cond:[{$eq:["$paymentStatus","Pending"]},"$totalAmount",0]
        }
      },
      Failed:{
        $sum:{
          $cond:[{$eq:["$paymentStatus","Failed"]},"$totalAmount",0]
        }
      }
    }
  }
]);





    const filteredOrders = orders.filter((o) => o.user);

    if (filteredOrders.length === 0) {
      return res.status(200).json({ Message: "Orders List Is Empty" });
    }

    res.status(200).json({
      orderData: filteredOrders,
      AmountStatus:AmountStatus,
      status: "success",
    });
  } catch (e) {
    res.status(500).json({
      Message: "Error in FetchAllordersList",
      Error: e.message,
    });
  }
};

const UpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ Error: "No order Id" });
    }

    const orderData = await orderModule.findById(id);

    if (!orderData) {
      return res.status(404).json({ Error: "No Order found" });
    }

    orderData.orderStatus = status;

    if (status === "Delivered") {
      orderData.paymentStatus = "Paid";
    } 
    else if (status === "Cancelled") {
      orderData.paymentStatus = "Failed";
    } 
    else if (status === "Shipped" || status === "Pending") {
      orderData.paymentStatus =
        orderData.paymentMethod === "Razorpay" ? "Paid" : "Pending";
    }

    await orderData.save();

    res.status(200).json({
      Status: "Success",
      Message: "Status Updated Successfully",
    });
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};


module.exports = {
  specificUserOrderList,
  FetchAllordersList,
  UpdateOrderStatus,
};
