import React, { useEffect, useState } from "react";
import { api } from "../Api/Axios";
import { useNavigate } from "react-router-dom";
import { ActionMenu, AddressCard } from "./Components/Actions";

/* -------------------- MAIN COMPONENT -------------------- */
function DashboardUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const res = await api.get("/admin/usersList");
      setUsers(res?.data?.UserData || []);
    } catch (e) {
      console.error(e.message);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };



   if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6925e]"></div>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 bg-[#fbf8f4] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#4b3f2f]">Users</h1>
        <p className="text-sm text-[#7a6a55]">Manage user accounts</p>
      </div>

      {/* ---------------- DESKTOP TABLE ---------------- */}
      <div className="hidden lg:block bg-white border border-[#e6dfd3] rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#f7f3ee]">
            <tr>
              {["User", "Email", "Status", "Address", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left font-semibold text-[#4b3f2f]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b border-[#f0e9dd] hover:bg-[#fcfbf9]"
              >
                <td className="px-6 py-4 font-medium text-[#4b3f2f]">
                  {u.firstName} {u.lastName}
                </td>

                <td className="px-6 py-4">{u.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.isBlock
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {u.isBlock ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <AddressCard address={u.address} />
                </td>

                <td className="px-6 py-4">
                  <ActionMenu
                    user={u}
                    openMenu={openMenu}
                    toggleMenu={toggleMenu}
                    navigate={navigate}
                    HandleActive={async () => {
                      const res =  await api.patch(`/admin/blockORunblock/${u._id}`);
                      setOpenMenu(null);
                      fetchUser();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE CARDS ---------------- */}
      <div className="lg:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white border border-[#e6dfd3] rounded-lg p-4"
          >
            <div className="flex justify-between mb-3">
              <div>
                <div className="font-semibold text-[#4b3f2f]">
                  {u.firstName} {u.lastName}
                </div>
                <div className="text-sm text-[#7a6a55]">{u.email}</div>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  u.isBlock
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {u.isBlock ? "Blocked" : "Active"}
              </span>
            </div>

            <AddressCard address={u.address} />

            <div className="mt-3">
              <ActionMenu
                user={u}
                openMenu={openMenu}
                toggleMenu={toggleMenu}
                navigate={navigate}
                HandleActive={async () => {
                  await api.patch(`/admin/blockORunblock/${u._id}`);
                  setOpenMenu(null);
                  fetchUser();
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardUser;
