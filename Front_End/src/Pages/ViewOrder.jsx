// ============================================================================
// 📌 ViewOrder.jsx — User Orders Management Page
// ----------------------------------------------------------------------------
// PURPOSE:
//  - Display all orders placed by the logged-in user
//  - Show status of each product inside an order
//  - Allow cancelling a single product without deleting the full order
//  - Update both UI (state) + backend (API)
//
// DEPENDENCIES:
//  - AuthContext -> To access and update logged-in user data
//  - axios instance (api) -> For API updating
//  - react-toastify -> For toast notifications
//  - react-router-dom -> For navigation (Link)
// ============================================================================

import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { api } from "../Api/Axios";
import { Link } from "react-router-dom";

// ============================================================================
// 📦 COMPONENT: ViewOrder()
// ============================================================================
function ViewOrder() {

  // ------------------------------------------------------------------------
  // 👤 USER CONTEXT — Extract logged-in user and updater
  // ------------------------------------------------------------------------
  const { user, setUser } = useContext(AuthContext);

  // ------------------------------------------------------------------------
  // 🗂️ Extract orders array safely (fallback to empty array)
  // ------------------------------------------------------------------------
  const orders = user?.order || [];

  // ------------------------------------------------------------------------
  // ❌ cancelSingleProduct(orderId, productId)
  // ROLE:
  //  - Locate specific order → locate product inside it
  //  - Change that product status to "Cancelled"
  //  - Update local AuthContext state immediately
  //  - Patch updated order back to API to store permanently
  // ------------------------------------------------------------------------
  const cancelSingleProduct = async (orderId, productId) => {

    // 1️⃣ Clone orders (immutability)
    const updatedOrders = [...orders];

    // 2️⃣ Find related order object
    const order = updatedOrders.find((o) => o.id === orderId);

    // 3️⃣ Find related product item
    const item = order.items.find((i) => i.product_id === productId);

    // 4️⃣ Update product status
    item.status = "Cancelled";

    // 5️⃣ Update React context for immediate UI refresh
    setUser({ ...user, order: updatedOrders });

    // 6️⃣ Make API call to permanently update database
    try {
      await api.patch(`/users/${user.id}`, { order: updatedOrders });
      toast.success("Product Cancelled ✅");
    } catch (error) {
      toast.error("Error updating server");
    }
  };

  // ============================================================================
  // 🎨 UI Rendering Section
  // ============================================================================
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* ---------------------------------------------------------------
            HEADER SECTION — Title & Navigation Link
        --------------------------------------------------------------- */}
        <div className="border-b border-gray-300 pb-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-light tracking-wider text-black">
              YOUR ORDERS
            </h2>

            {/* Navigate back home */}
            <Link
              to="/"
              className="text-gray-600 hover:text-black transition-all duration-200 font-light text-sm tracking-wide border border-gray-300 px-4 py-2 hover:border-black"
            >
              ← RETURN HOME
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            SCROLLABLE CONTENT AREA
        --------------------------------------------------------------- */}
        <div className="space-y-8 max-h-[75vh] overflow-y-auto pb-6">

          {/* ---------------------------------------------------------------
              EMPTY ORDER DISPLAY WHEN NO ORDERS FOUND
          --------------------------------------------------------------- */}
          {orders.length === 0 && (
            <div className="border border-gray-300 p-12 text-center">
              <p className="text-gray-500 font-light tracking-wide text-lg mb-2">
                NO ORDERS YET
              </p>
              <p className="text-gray-400 text-sm font-light">
                Your order history will appear here
              </p>
            </div>
          )}

          {/* ---------------------------------------------------------------
              ORDER LIST LOOP — iterate & show each order card
          --------------------------------------------------------------- */}
          {orders?.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 p-8"
            >

              {/* Order ID Title */}
              <div className="border-b border-gray-300 pb-4 mb-6">
                <h3 className="text-xl font-light tracking-wider text-black uppercase">
                  Order #{order.id}
                </h3>
                <p className="text-gray-500 text-sm font-light mt-1">
                  Placed on {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* -----------------------------------------------------------
                  PRODUCT ITEMS INSIDE EACH ORDER
              ----------------------------------------------------------- */}
              <div className="space-y-6">
                {order?.items?.map((item) => (
                  <div
                    key={item.product_id}
                    className="border border-gray-200 p-6 flex gap-6 items-start hover:border-gray-400 transition-all duration-300"
                  >
                  
                    {/* -------------------------------
                        PRODUCT IMAGE SECTION
                    -------------------------------- */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-24 h-24 object-cover border border-gray-200"
                      />
                    </div>

                    {/* -------------------------------
                        PRODUCT DETAILS SECTION
                    -------------------------------- */}
                    <div className="flex-1 space-y-3">
                      <p className="text-lg font-light text-black tracking-wide">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="font-light text-gray-600">QUANTITY: </span>
                          <span className="text-black font-light">1</span>
                        </div>
                       
                      </div>

                      {/* Status Display */}
                      <div className="flex items-center gap-4">
                        <span className="font-light text-gray-600 text-sm">STATUS:</span>
                        <span
                          className={
                            item.status === "Cancelled"
                              ? "text-red-600 font-light text-sm tracking-wide"
                              : item.status === "Delivered"
                              ? "text-green-600 font-light text-sm tracking-wide"
                              : item.status === "Shipped"
                              ? "text-blue-600 font-light text-sm tracking-wide"
                              : "text-black font-light text-sm tracking-wide"
                          }
                        >
                          {item.status || "PENDING"}
                        </span>
                      </div>
                    </div>

                    {/* -------------------------------
                        ACTION BUTTON SECTION
                    -------------------------------- */}
                    <div className="flex-shrink-0">
                      <button
                        disabled={
                          item.status === "Cancelled" ||
                          item.status === "Delivered" ||
                          item.status === "Shipped"
                        }
                        onClick={() => cancelSingleProduct(order.id, item.product_id)}
                        className="px-6 py-3 text-sm font-light tracking-wide transition border border-black text-black hover:bg-black hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed min-w-[120px]"
                      >
                        {item.status === "Cancelled" ? "CANCELLED" : 
                         item.status === "Delivered" ? "DELIVERED" :
                         item.status === "Shipped" ? "SHIPPED" : "CANCEL ITEM"}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="border-t border-gray-300 pt-4 mt-6 flex justify-between items-center text-sm">
                <span className="text-gray-600 font-light">
                  {order.items?.length} ITEM{order.items?.length > 1 ? 'S' : ''}
                </span>
               
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 📤 EXPORT
// ============================================================================
export default ViewOrder;