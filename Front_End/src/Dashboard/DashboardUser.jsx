import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import { api } from "../Api/Axios";
import { useNavigate } from "react-router-dom";

function DashboardUser() {
  const navigate = useNavigate();
  const { datas } = useFetch("/users");
  const [Search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  
  useEffect(() => {
    if (datas) setUser(datas);
  }, [datas]);
  
  const Users = user.filter((item) => item.role === "user");
  const FilterUser = Users.filter((user) =>
    user?.LastName?.toLowerCase()?.includes(Search?.toLowerCase())
  );

  const HandleActive = async (userID, status) => {
    await api.patch(`/users/${userID}`, { isBlock: !status });
    setUser((prev) =>
      prev.map((user) =>
        user.id === userID ? { ...user, isBlock: !status } : user
      )
    );
    setOpenMenu(null);
  };

  const toggleMenu = (userId) => {
    setOpenMenu(openMenu === userId ? null : userId);
  };

  const AddressCard = ({ address }) => (
    <div className="p-3 bg-[#f7f3ee] rounded-lg border border-[#e6dfd3] text-xs">
      <div className="space-y-1">
        <div><strong>Name:</strong> {address.name}</div>
        <div><strong>Mobile:</strong> {address.number}</div>
        <div><strong>Pincode:</strong> {address.pinCode}</div>
        <div><strong>Address:</strong> {address.address}</div>
        <div><strong>City:</strong> {address.city}, {address.state}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-[#fbf8f4] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#4b3f2f]">Users</h1>
          <p className="text-sm text-[#7a6a55]">Manage user accounts</p>
        </div>
        <div className="relative">
          <input
            type="text"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by last name..."
            className="w-full lg:w-80 px-4 py-2 rounded-lg border border-[#e6dfd3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d6b98d]"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white border border-[#e6dfd3] rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#f7f3ee]">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#4b3f2f]">User</th>
              <th className="px-6 py-3 text-left font-semibold text-[#4b3f2f]">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-[#4b3f2f]">Password</th>
              <th className="px-6 py-3 text-left font-semibold text-[#4b3f2f]">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-[#4b3f2f]">Address</th>
              <th className="px-6 py-3 text-left font-semibold text-[#4b3f2f]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {FilterUser.map((userItem) => (
              <tr key={userItem.id} className="border-b border-[#f0e9dd] hover:bg-[#fcfbf9]">
                <td className="px-6 py-4">
                  <div className="font-medium text-[#4b3f2f]">
                    {userItem.FirstName} {userItem.LastName}
                  </div>
                </td>
                <td className="px-6 py-4 text-[#4b3f2f]">{userItem.Email}</td>
                <td className="px-6 py-4">
                  <div className="font-mono text-xs text-[#7a6a55] bg-[#f7f3ee] px-2 py-1 rounded">
                    {userItem.password}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    userItem.isBlock 
                      ? "bg-red-100 text-red-700" 
                      : "bg-green-100 text-green-700"
                  }`}>
                    {userItem.isBlock ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {userItem.address?.length === 0 ? (
                    <span className="text-gray-400 text-sm">No address</span>
                  ) : (
                    <AddressCard address={userItem.address[0]} />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(userItem.id)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#4b3f2f] text-white hover:bg-[#3a3326]"
                    >
                      Actions
                      <svg className={`w-3 h-3 transition-transform ${openMenu === userItem.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {openMenu === userItem.id && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e6dfd3] rounded-lg shadow-lg z-10">
                        <button onClick={() => navigate('/dashboard/setcart', { state: { userCart: userItem.cart } })} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3]">
                          View Cart
                        </button>
                        <button onClick={() => navigate('/dashboard/setwishlist', { state: { userWish: userItem.wishList } })} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3]">
                          View WishList
                        </button>
                        <button onClick={() => navigate('/dashboard/setorder', { state: { userOrder: userItem.order } })} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3]">
                          View Orders
                        </button>
                        <button onClick={() => HandleActive(userItem.id, userItem.isBlock)} className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] ${
                          userItem.isBlock ? "text-green-600" : "text-red-600"
                        }`}>
                          {userItem.isBlock ? "Unblock User" : "Block User"}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {FilterUser.map((userItem) => (
          <div key={userItem.id} className="bg-white border border-[#e6dfd3] rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-semibold text-[#4b3f2f] text-lg">{userItem.FirstName} {userItem.LastName}</div>
                <div className="text-sm text-[#7a6a55]">{userItem.Email}</div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                userItem.isBlock ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}>
                {userItem.isBlock ? "Blocked" : "Active"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-[#7a6a55] mb-1">Password</div>
                <div className="text-sm font-mono text-[#4b3f2f] bg-[#f7f3ee] px-2 py-1 rounded">
                  {userItem.password}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-[#4b3f2f] mb-2">Address</div>
              {userItem.address?.length === 0 ? (
                <span className="text-gray-400 text-sm">No address provided</span>
              ) : (
                <AddressCard address={userItem.address[0]} />
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleMenu(`actions-${userItem.id}`)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg bg-[#4b3f2f] text-white"
              >
                User Actions
                <svg className={`w-4 h-4 transition-transform ${openMenu === `actions-${userItem.id}` ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openMenu === `actions-${userItem.id}` && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e6dfd3] rounded-lg shadow-lg z-10">
                  <button onClick={() => navigate('/dashboard/setcart', { state: { userCart: userItem.cart } })} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3]">
                    View Cart
                  </button>
                  <button onClick={() => navigate('/dashboard/setwishlist', { state: { userWish: userItem.wishList } })} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3]">
                    View WishList
                  </button>
                  <button onClick={() => navigate('/dashboard/setorder', { state: { userOrder: userItem.order } })} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3]">
                    View Orders
                  </button>
                  <button onClick={() => HandleActive(userItem.id, userItem.isBlock)} className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] ${
                    userItem.isBlock ? "text-green-600" : "text-red-600"
                  }`}>
                    {userItem.isBlock ? "Unblock User" : "Block User"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {FilterUser.length === 0 && (
        <div className="text-center py-12 text-[#7a6a55]">
          {Search ? "No users found" : "No users available"}
        </div>
      )}
    </div>
  );
}

export default DashboardUser;