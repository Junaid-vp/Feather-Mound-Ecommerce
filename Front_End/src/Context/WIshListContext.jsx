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
  const fetchWishlist = async () => {
    try {
       const res = await api.get("/wishlist");
      
      setWishlist(res.data.WishlistDatas?.items || []);
    } catch (e) {
   toast.error(e?.response?.data?.Message || "Failed to fetch wishlist")
    
    }
  };

   useEffect(() => {
     if (user) {
       fetchWishlist();
     }else{
setWishlist([])
     }
   }, [user]);


  // ------------------------------------------------------------------------
  // Toggle wishlist: add if not exists, remove if exists
  // ------------------------------------------------------------------------
  const toggleWishlist = async(product) => {
   try{

    await api.patch(`/wishlist/${product._id}`)
fetchWishlist(); 
   }catch(e){
    console.error("addWish patch error:", e);
    toast.error("❌ Error while adding to wishlist");
   }
   

  };

  return (
    <WishListContext.Provider
     value={{ wishList, toggleWishlist }}

    >
      {children}
    </WishListContext.Provider>
  );
}
