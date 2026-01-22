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
  const { user, setUser } = useContext(AuthContext);

  // ------------------------------------------------------------------------
  // fetchCart(userId)
  // - Loads user's cart from server and updates local state
  // ------------------------------------------------------------------------
  const fetchCart = async (userId) => {
    try {
      if (user.role !== "admin") {
        const res = await api.get(`/users/${userId}`);
        setCart(res.data.cart || []);
        setCartLength(res.data.cart.length);
      } else {
        setCart([]);
        setCartLength(0);
      }
    } catch (error) {
      console.log("❌ CART FETCH ERROR:", error);
      toast.error("Failed to load cart");
    }
  };

  // Sync cart when user changes (login/logout)
  useEffect(() => {
    if (user) {
      fetchCart(user?.id);
    }
  }, [user]);

  // ------------------------------------------------------------------------
  // addCart(product)
  // - Adds product or increases quantity
  // - Updates server and shows toast feedback
  // ------------------------------------------------------------------------
  const addCart = async (product) => {
    if (!user) {
      toast.error("Please login to add items", {
  position: "top-right",
  autoClose: 1800,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  className: "premium-toast",
});
      return;
    }

    const exists = cart.find((item) => item.product_id === product.product_id);
    let updated;

    if (exists) {
      updated = cart.map((item) =>
        item.product_id === product.product_id
          ? { ...item, Quantity: item.Quantity + 1 }
          : item
      );
      toast.info("Quantity increased");
    } else {
      updated = [...cart, { ...product, Quantity: 1 }];
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
    }

    setCart(updated);

    try {
      const updated_cart = await api.patch(`/users/${user.id}`, {
        cart: updated,
      });
      setCartLength(updated_cart.data.cart.length);
    } catch (error) {
      console.log("❌ CART ADD/PATCH ERROR:", error);
      toast.error("Could not update cart on server");
    }
  };

  // ------------------------------------------------------------------------
  // removeCart(product)
  // - Removes product from cart, updates server and shows toast
  // ------------------------------------------------------------------------
  const removeCart = async (product) => {
    const updated = cart.filter(
      (item) => item.product_id !== product.product_id
    );
    setCart(updated);

    toast.success(
      <div className="toast-content">
        <span className="toast-title">{product.name}</span>
        <span className="toast-subtitle">Remove From Cart</span>
      </div>,
      {
        icon: "✅",
        className: "custom-toast",
      }
    );

    try {
      const updated_cart = await api.patch(`/users/${user.id}`, {
        cart: updated,
      });
      setCartLength(updated_cart.data.cart.length);
    } catch (error) {
      console.log("❌ CART REMOVE ERROR:", error);
      toast.error("Could not remove item from server");
    }
  };

  // ------------------------------------------------------------------------
  // addQuantity(productId)
  // - Increase Quantity up to a ceiling (10)
  // - Persist to server
  // ------------------------------------------------------------------------
  const addQuantity = async (productId) => {
    const updated = cart.map((item) =>
      item.product_id === productId
        ? {
            ...item,
            Quantity: item.Quantity < 10 ? item.Quantity + 1 : item.Quantity,
          }
        : item
    );

    setCart(updated);

    try {
      await api.patch(`/users/${user.id}`, { cart: updated });
    } catch (error) {
      console.log("❌ QUANTITY INCREASE ERROR:", error);
      toast.error("Could not update quantity on server");
    }
  };

  // ------------------------------------------------------------------------
  // lessQuantity(productId)
  // - Decrease Quantity (not below 1)
  // - Persist to server
  // ------------------------------------------------------------------------
  const lessQuantity = async (productId) => {
    const updated = cart.map((item) =>
      item.product_id === productId
        ? {
            ...item,
            Quantity: item.Quantity > 1 ? item.Quantity - 1 : item.Quantity,
          }
        : item
    );

    setCart(updated);

    try {
      await api.patch(`/users/${user.id}`, { cart: updated });
    } catch (error) {
      console.log("❌ QUANTITY DECREASE ERROR:", error);
      toast.error("Could not update quantity on server");
    }
  };

  // ------------------------------------------------------------------------
  // HandleClearCart(userId)
  // - Clears server cart and local state
  // ------------------------------------------------------------------------
  const HandleClearCart = async (userId) => {
    try {
      await api.patch(`/users/${userId}`, { cart: [] });
      setCart([]);
      setCartLength(0);
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.log("❌ SOMETHING ERROR :", error);
      toast.error("Failed to clear cart");
    }
  };

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
        HandleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
