import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
          
          {/* LEFT — BRAND + QUICK LINKS */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-12">
            
            {/* Brand - Hidden on small screens, shown on medium+ */}
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-black hidden sm:block">
                MIRAGGIO
              </h2>
              {/* Logo Icon - Only shown on small screens */}
              <div className="sm:hidden flex justify-center mb-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">M</span>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Elevated essentials for the discerning
              </p>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm">
                <li>
                  <Link 
                    to="/" 
                    className="text-black hover:text-gray-700 transition-all duration-300 hover:translate-x-1 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/wishlist" 
                    className="text-black hover:text-gray-700 transition-all duration-300 hover:translate-x-1 font-medium"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cart" 
                    className="text-black hover:text-gray-700 transition-all duration-300 hover:translate-x-1 font-medium"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/orders" 
                    className="text-black hover:text-gray-700 transition-all duration-300 hover:translate-x-1 font-medium"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT — SOCIAL ICONS */}
          <div className="flex justify-center lg:justify-end">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              <li>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 border border-gray-200"
                  title="WhatsApp"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center transition-all duration-300">
                    <FaWhatsapp size={16} className="sm:w-18 text-black" />
                  </div>
                  <span className="font-medium text-black text-xs sm:text-sm hidden xs:block">
                    WhatsApp
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 border border-gray-200"
                  title="Instagram"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center transition-all duration-300">
                    <FaInstagram size={16} className="sm:w-18 text-black" />
                  </div>
                  <span className="font-medium text-black text-xs sm:text-sm hidden xs:block">
                    Instagram
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 border border-gray-200"
                  title="Facebook"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center transition-all duration-300">
                    <FaFacebookF size={16} className="sm:w-18 text-black" />
                  </div>
                  <span className="font-medium text-black text-xs sm:text-sm hidden xs:block">
                    Facebook
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
            <p className="text-gray-600 text-xs sm:text-sm">
              © {new Date().getFullYear()} MIRAGGIO — All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs text-gray-600">
              <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-black cursor-pointer transition-colors">Returns & Exchanges</span>
            </div>
          </div>
        </div>

        {/* DECORATIVE ACCENT */}
        <div className="w-full flex justify-center pt-4">
          <div className="h-1 w-16 sm:w-20 bg-black rounded-full" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;