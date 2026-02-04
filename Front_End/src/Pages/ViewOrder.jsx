import React, { useState, useEffect } from "react";
import { api } from "../Api/Axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../utils/Modal";

function ViewOrder() {
  const [orders, setOrder] = useState([]);
  const [showModal,setShowModal] = useState(null)


  const fetchOrder = async () => {
    try {
      const res = await api.get("/order");
      setOrder(res?.data?.orderData || []);
    } catch (e) {
      setOrder([]);
      console.error(e.message)
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const HandleCancel = async (orderID) => {
    try {
      await api.patch(`/order/cancel`, { id: orderID });
      fetchOrder();
      toast.success("Cancel Succesfull");
    } catch (e) {

      toast.error("Cancel Fail");
    }finally{
      setShowModal(false)
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-light tracking-wider text-black">
              YOUR ORDERS
            </h2>
            <Link
              to="/"
              className="text-xs text-gray-600 hover:text-black transition
              font-light tracking-wide border border-gray-300 px-3 py-1 hover:border-black"
            >
              ← RETURN HOME
            </Link>
          </div>
        </div>

        <div className="space-y-4 max-h-[75vh] overflow-y-auto pb-4">
          {orders.length === 0 && (
            <div className="border border-gray-300 p-6 text-center">
              <p className="text-gray-500 font-light tracking-wide text-sm mb-1">
                NO ORDERS YET
              </p>
              <p className="text-gray-400 text-xs font-light">
                Your order history will appear here
              </p>
            </div>
          )}

          {orders.map((order) => (
            <div key={order._id} className="border border-gray-300 p-4">
              <div className="border-b border-gray-300 pb-3 mb-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-base font-light tracking-wide text-black">
                      Order #{order._id}
                    </h3>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-4 text-xs mt-2">
                      <span>Total: ₹{order.totalAmount}</span>
                      <span>Payment: {order.paymentMethod}</span>
                    </div>
                  </div>

                  <button
                    disabled={order.orderStatus === "Cancelled" || order.orderStatus === "Shipped" || order.orderStatus === "Delivered" }
                    onClick={() =>setShowModal(order._id)}
                    className="px-4 py-2 text-xs font-light tracking-wide transition
                              border border-black text-black
                              hover:bg-black hover:text-white
                              disabled:border-gray-300 disabled:text-gray-400
                              disabled:hover:bg-transparent disabled:cursor-not-allowed"
                  >
                    {order.orderStatus === "Cancelled" ? "Cancelled" : "Cancel"}
                  </button>
  
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 p-3 flex gap-4 items-start"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover border"
                    />

                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-light text-black">
                        {item.product.name}
                      </p>

                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-xs text-gray-600">
                        Status: {order.orderStatus || "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
            { showModal && <Modal onClose={()=>setShowModal(null)} onConfirm={()=>HandleCancel(showModal)}/>}
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
