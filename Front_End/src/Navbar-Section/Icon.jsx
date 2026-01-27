// ============================================================================
// Icon.jsx — Navbar action icons: Search, Wishlist, Cart badge, Profile/Login
// - Uses AuthContext to show profile link when logged in
// - Uses CartContext to show cart item count badge
// - No behavior changed — only concise headers for clarity
// ============================================================================

import React, { useContext } from "react";
import {
  HeartIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

function Icon() {
  // Contexts
  const { cartLength } = useContext(CartContext); // number of items in cart (badge)
  const { user,setClick } = useContext(AuthContext); // logged-in user (truthy when logged in)
  const navigate = useNavigate()
  
  return (
    <div className="flex items-center space-x-5">
      {/* Search: navigates to search page */}
      <Link to="/SearchBox" className="text-gray-700 hover:text-black" aria-label="Search">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </Link>

      {/* Wishlist: navigates to wishlist (user-protected route should handle auth) */}
      <Link to="/wishlist" className="text-gray-700 hover:text-black" aria-label="Wishlist">
        <HeartIcon className="h-6 w-6" />
      </Link>

      {/* Cart: shows badge when cartLength > 0 */}
      <Link to="/cart" className="relative text-gray-700 hover:text-black" aria-label="Cart">
        <ShoppingBagIcon className="h-6 w-6" />

        {cartLength > 0 && (
          <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full px-1.5 py-0.5">
            {cartLength}
          </span>
        )}
      </Link>

      {/* Profile / Login:
          - If user exists -> link to profile
          - Else -> link to login
          (Icon is identical for both states; route differs)
      */}
      {user ? (
        <button  onClick={()=>{navigate("/profile")}} className="text-gray-700 hover:text-black" aria-label="Profile">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      ) : (
        <Link to="/login" className="text-gray-700 hover:text-black" aria-label="Login">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default Icon;
