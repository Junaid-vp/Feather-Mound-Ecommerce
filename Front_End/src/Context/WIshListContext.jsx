import React, { useContext, useEffect, useState, createContext } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../Api/Axios";
import { toast } from "react-toastify";

export const WishListContext = createContext();

export function WishListProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishList, setWishlist] = useState([]);

  // ------------------------------------------------------------------------
  // Fetch wishlist from server when user logs in or changes
  // ------------------------------------------------------------------------
  const fetchWishlist = async (userId) => {
    if (!userId) return;
    try {
      const res = await api.get(`/users/${userId}`);
      setWishlist(res.data.wishList || []);
    } catch (e) {
      toast.error("❌ Error while fetching wishlist");
      console.error(e);
    }
  };

  useEffect(() => {
    if (user?.id) fetchWishlist(user.id);
    else setWishlist([]);
  }, [user]);

  // ------------------------------------------------------------------------
  // Add product to wishlist
  // ------------------------------------------------------------------------
  const addWish = async (product) => {
    if (!user) {
      toast.error("Please Login First", {
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

    if (wishList.some((item) => item.product_id === product.product_id)) {
      toast.error("❌ Already in wishlist");
      return;
    }

    const updatedWishList = [...wishList, { ...product }];
    setWishlist(updatedWishList);

    try {
      await api.patch(`/users/${user.id}`, { wishList: updatedWishList });
      toast.success(
        <div className="toast-content">
          <span className="toast-title">{product.name}</span>
          <span className="toast-subtitle">Added to Wishlist successfully</span>
        </div>,
        { icon: "✅", className: "custom-toast" }
      );
    } catch (e) {
      console.error("addWish patch error:", e);
      toast.error("❌ Error while adding to wishlist");
    }
  };

  // ------------------------------------------------------------------------
  // Remove product from wishlist
  // ------------------------------------------------------------------------
  const RemoveWishList = async (product) => {
    const updated = wishList.filter(
      (item) => item.product_id !== product.product_id
    );
    setWishlist(updated);

    try {
      await api.patch(`/users/${user.id}`, { wishList: updated });

      toast.success(
        <div className="toast-content">
          <span className="toast-title">{product.name}</span>
          <span className="toast-subtitle">Removed from Wishlist</span>
        </div>,
        { icon: "✅", className: "custom-toast" }
      );
    } catch (e) {
      console.error("RemoveWishList patch error:", e);
      toast.error("❌ Error while removing from wishlist");
    }
  };

  // ------------------------------------------------------------------------
  // Toggle wishlist: add if not exists, remove if exists
  // ------------------------------------------------------------------------
  const toggleWishlist = (product) => {
    const exists = wishList.some(
      (item) => item.product_id === product.product_id
    );

    if (exists) RemoveWishList(product);
    else addWish(product);
  };

  return (
    <WishListContext.Provider
      value={{ wishList, addWish, RemoveWishList, toggleWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
}
