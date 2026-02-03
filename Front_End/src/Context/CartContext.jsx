

import React, { createContext, useEffect, useState, useContext } from "react";
import { api } from "../Api/Axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const { user } = useContext(AuthContext);


  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      setCart(res?.data?.cartData?.items || []);

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
        },
      );

      fetchCart();
    } catch (e) {
      toast.error("Please log in to continue.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className: "premium-toast error",
      });
    }
  };


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
        },
      );

      fetchCart();
    } catch (e) {
      toast.error(e.response?.data?.Message);
    }
  };

  // addQuantity(productId)
  // - Increase Quantity up to a ceiling (10)
  // - Persist to server
  // ------------------------------------------------------------------------
  const addQuantity = async (productId) => {
    try {
      await api.patch(`/cart/increase/${productId}`);
      fetchCart();
    } catch (e) {
      toast.warning(e.response?.data?.Message);
    }
  };


  // lessQuantity(productId)
  // - Decrease Quantity (not below 1)
  // - Persist to server
  // ------------------------------------------------------------------------
  const lessQuantity = async (productId) => {
    try {
      await api.patch(`/cart/decrease/${productId}`);
      fetchCart();
    } catch (e) {
      toast.warning("MiniMum Limit Is 0");
    }
  };

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
