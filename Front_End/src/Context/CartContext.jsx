// ============================================================================
// CartContext.jsx — Cart provider (fetch, add, remove, qty updates, clear cart)
// - Uses AuthContext for current user
// - Persists cart to server via `api.patch`
// - Shows toasts for user feedback
// ============================================================================

import React, { createContext, useEffect, useState, useContext } from "react";
import { api } from "../Api/Axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";


export const CartContext = createContext();

function CartProvider({ children }) {
  // ------------------------------------------------------------------------
  // State: cart items + cart length (for badges)
  // ------------------------------------------------------------------------
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  // ------------------------------------------------------------------------
  // Auth: current user (used for server requests)
  // ------------------------------------------------------------------------
  const { user } = useContext(AuthContext);

  // ------------------------------------------------------------------------
  // fetchCart(userId)
  // - Loads user's cart from server and updates local state
  // ------------------------------------------------------------------------
const fetchCart = async () => {
  try {
    const res = await api.get("/cart");

    setCart(res?.data?.cartData?.items || [])

    

    setCartLength(res?.data?.cartData?.items?.length);


  } catch (error) {
    console.log("❌ CART FETCH ERROR:", error);
    toast.error("Failed to load cart");
  }
};


useEffect(() => {
  if (user) {
    fetchCart();
  } else {
    setCart([]);
    setCartLength(0);
  }
}, [user]);



  // ------------------------------------------------------------------------
  // addCart(product)
  // - Adds product or increases quantity
  // - Updates server and shows toast feedback
  // ------------------------------------------------------------------------
const addCart = async (product) => {
  try {
    await api.post(`/cart/add/${product._id}`);

    toast.success(
      <div className="toast-content">
        <span className="toast-title">{product.name}</span>
        <span className="toast-subtitle">Added to Cart</span>
      </div>,
      {
        icon: "✅",
        className: "custom-toast",
      }
    );

     fetchCart()

  } catch (e) {
    if (e.response?.status === 409) {
      toast.warning(e.response.data.Message
);
    } else {
      toast.error(e.response.data.Message);
    }
  }
};


  // ------------------------------------------------------------------------
  // removeCart(product)
  // - Removes product from cart, updates server and shows toast
  // ------------------------------------------------------------------------
 const removeCart = async (product) => {
  try {
   await api.patch(`/cart/remove/${product._id}`);

    toast.success(
      <div className="toast-content">
        <span className="toast-title">{product.name}</span>
        <span className="toast-subtitle">Removed from cart</span>
      </div>,
      {
        icon: "🗑️",
        className: "custom-toast",
      }
    );

    fetchCart()

  } catch (e) {
    

    toast.error(e.response?.data?.Message);
  }
};


  // ------------------------------------------------------------------------
  // addQuantity(productId)
  // - Increase Quantity up to a ceiling (10)
  // - Persist to server
  // ------------------------------------------------------------------------
  const addQuantity = async (productId) => {
  try {
    await api.patch(`/cart/increase/${productId}`);
    fetchCart()
  } catch (e) {
   
    toast.warning(e.response?.data?.Message);
  }
};

  // ------------------------------------------------------------------------
  // lessQuantity(productId)
  // - Decrease Quantity (not below 1)
  // - Persist to server
  // ------------------------------------------------------------------------
  const lessQuantity = async (productId) => {
   try {
    await api.patch(`/cart/decrease/${productId}`);
    fetchCart()
  } catch (e) {
   
    toast.warning(e.response?.data?.Message);
  }
  };

  // ------------------------------------------------------------------------
  // HandleClearCart(userId)
  // - Clears server cart and local state
  // ------------------------------------------------------------------------
  // const HandleClearCart = async (userId) => {
  //   try {
  //     await api.patch(`/users/${userId}`, { cart: [] });
  //     setCart([]);
  //     setCartLength(0);
  //     toast.success("Cart cleared successfully");
  //   } catch (error) {
  //     console.log("❌ SOMETHING ERROR :", error);
  //     toast.error("Failed to clear cart");
  //   }
  // };

  // ------------------------------------------------------------------------
  // Provider value (exposed API for consumers)
  // ------------------------------------------------------------------------
  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        addQuantity,
        lessQuantity,
        fetchCart,
        cartLength,
        setCart,
        // HandleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
