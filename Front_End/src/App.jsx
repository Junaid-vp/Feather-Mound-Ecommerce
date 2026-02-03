// ============================================================================
// 📌 App.jsx — Main Application Layout Wrapper
// This file manages Layout visibility, Context Providers, and AOS Animation Init
// ============================================================================

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar-Section/Navbar";
import Footer from "./Footer-Section/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

// =====================
// 🌐 GLOBAL CONTEXT PROVIDERS
// =====================
import CartProvider from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import { WishListProvider } from "./Context/WIshListContext";



function App() {
  
  // ------------------------------------------------------------------------
  // 📍 Detect Current Route Path for Layout Logic
  // ------------------------------------------------------------------------
  const location = useLocation();
  

  const path = (location?.pathname || "").toLowerCase();

  // Hide Navbar & Footer for Dashboard Admin Panel Only
  const hideLayout = path.startsWith("/dashboard");

  
  // ------------------------------------------------------------------------
  // 🎞️ Initialize AOS (Scroll Animation Library)
  // ------------------------------------------------------------------------
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);


  // ------------------------------------------------------------------------
  // 🧩 Application Layout Rendering Logic
  // - All Routes Render Inside <Outlet />
  // - Navbar & Footer are hidden only for /dashboard routes
  // ------------------------------------------------------------------------
  return (
      <AuthProvider>

        <CartProvider>
          <WishListProvider>

            {/* 🔼 Show Navbar only if route is NOT Dashboard */}
            {!hideLayout && <Navbar />}

            {/* 🔀 Dynamic Route Child Rendering */}
            <Outlet />

            {/* 🔽 Show Footer only if route is NOT Dashboard */}
            {!hideLayout && <Footer />}

          </WishListProvider>
        </CartProvider>

      </AuthProvider>
  );
}

export default App;
