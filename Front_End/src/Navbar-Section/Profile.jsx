import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";


function Profile() {
  const { cartLength } = useContext(CartContext);
  const navigate = useNavigate();
  const {  Logout,userData } = useContext(AuthContext);
  



  const handleLogout = async () => {
    try {
      await Logout();
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatAddress = (address) => {
    if (!address) return null;
    
   
    return {
      name: address?.name || "Not provided",
      number: address?.number || "Not provided",
      pinCode: address?.pinCode || "Not provided",
      locality: address?.locality || "Not provided",
      address: address?.address || "Not provided",
      city: address?.city || "Not provided",
      state: address?.state || "Not provided"
    };
  };

  const formattedAddress = formatAddress(userData?.address);

  return (
    <div 
      className="min-h-screen flex items-start justify-center bg-white p-4 py-6"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="w-full max-w-2xl bg-white border border-gray-200">
        {/* Header Section - Minimal */}
        <div className="border-b border-gray-200 p-6 text-center">
          <h2 className="text-2xl font-light tracking-wide text-black mb-2">
            Your Account
          </h2>
          <p className="text-gray-600 font-light text-sm">
            Welcome back, {userData?.firstName}  {userData?.lastName}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Actions - Minimal */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/vieworder"
              className="px-6 py-2 bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-300 font-light text-center text-xs tracking-wide flex-1"
            >
              VIEW ORDERS
            </Link>
            <Link
              to="/cart"
              className="px-6 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-300 font-light text-center text-xs tracking-wide flex-1"
            >
              CART ({cartLength || 0})
            </Link>
          </div>

          {/* Two Column Layout: Account & Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Account Details Card */}
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="text-sm font-light tracking-wider text-black mb-4 uppercase border-b border-gray-200 pb-2">
                Account
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-light text-gray-600 tracking-wide">NAME</span>
                  <span className="text-black font-light text-right">
                    {userData?.firstName} {userData?.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-light text-gray-600 tracking-wide">EMAIL</span>
                  <span className="text-black font-light text-right">{userData?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-light text-gray-600 tracking-wide">CART</span>
                  <span className={`font-light ${cartLength > 0 ? 'text-black' : 'text-gray-500'}`}>
                    {cartLength > 0 ? `${cartLength}` : "EMPTY"}
                  </span>
                </div>
              </div>
            </div>

            {/* Address Details Card */}
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="text-sm font-light tracking-wider text-black mb-4 uppercase border-b border-gray-200 pb-2">
                Address
              </h3>

              <div className="space-y-3 text-xs">
                {formattedAddress ? (
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="font-light text-gray-600 tracking-wide">NAME</span>
                      <span className="text-black font-light text-right">{formattedAddress?.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="font-light text-gray-600 tracking-wide">PHONE</span>
                      <span className="text-black font-light text-right">{formattedAddress?.number}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="font-light text-gray-600 tracking-wide">PINCODE</span>
                      <span className="text-black font-light text-right">{formattedAddress?.pinCode}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="font-light text-gray-600 tracking-wide">LOCALITY</span>
                      <span className="text-black font-light text-right">{formattedAddress?.locality}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="font-light text-gray-600 tracking-wide">CITY</span>
                      <span className="text-black font-light text-right">{formattedAddress?.city}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-light text-gray-600 tracking-wide">STATE</span>
                      <span className="text-black font-light text-right">{formattedAddress?.state}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <span className="font-light text-gray-600 tracking-wide block mb-1 text-xs">ADDRESS</span>
                      <p className="text-black font-light text-xs leading-relaxed">
                        {formattedAddress?.address}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 font-light tracking-wide text-xs">
                      NO ADDRESS SAVED
                    </p>
                    <p className="text-gray-400 text-xs mt-1 font-light">
                      Add during checkout
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Logout Button at Bottom */}
        <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-300 font-light tracking-wider text-xs uppercase"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;