import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../Context/AuthContext";
import AdminDashboardLoader from "../Loader Component/AdminDashboardLoader";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { Logout, user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <UsersIcon className="w-5 h-5" />,
      label: "Users",
      to: "/dashboard/user",
    },
    {
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      label: "Orders",
      to: "/dashboard/order",
    },
    {
      icon: <CubeIcon className="w-5 h-5" />,
      label: "Products",
      to: "/dashboard/products",
    },
  ];

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <AdminDashboardLoader onLoadingComplete={handleLoadingComplete} />;
  }

  return (

<div className="flex h-screen overflow-hidden bg-[#faf9f7] text-gray-800 font-sans">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col ${
          open ? "w-64" : "w-20"
        } bg-white/80 backdrop-blur-xl border-r border-[#e6dfd3] shadow-lg transition-all duration-300 flex-shrink-0 sticky top-0 h-screen overflow-hidden`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#e6dfd3]">
          <h1
            className={`text-[1.3rem] font-semibold tracking-[2px] text-[#4b3f2f] uppercase ${
              !open && "hidden"
            }`}
          >
            Miraggio
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-[#f6f3ef] transition"
          >
            <Bars3Icon className="w-5 h-5 text-[#4b3f2f]" />
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-1">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group flex items-center gap-3 px-5 py-3 text-sm font-medium rounded-lg transition-all duration-300 relative
                ${
                  active
                    ? "bg-gradient-to-r from-[#f1e8dc] to-[#fffaf5] text-[#3e3223] shadow-inner"
                    : "text-[#7a6a55] hover:bg-[#f7f3ee] hover:text-[#3e3223]"
                }`}
              >
                <span
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    active ? "text-[#b6925e]" : "text-[#a8957b]"
                  }`}
                >
                  {item.icon}
                </span>
                {open && <span className="transition-all">{item.label}</span>}

                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#d6b98d] to-[#f1e8dc] opacity-0 group-hover:opacity-100 rounded-r-md transition-opacity duration-300"></span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#e6dfd3]">
          <button
            onClick={Logout}
            className="flex items-center gap-3 px-3 py-2 text-[#b33a3a] hover:bg-[#f9eaea] w-full rounded-md transition-all"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full bg-white/95 backdrop-blur-xl border-r border-[#e6dfd3] shadow-xl transition-transform duration-300 z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#e6dfd3]">
          <h1 className="text-[1.3rem] font-semibold tracking-[2px] text-[#4b3f2f] uppercase">
            Miraggio
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-[#f6f3ef] transition"
          >
            <XMarkIcon className="w-5 h-5 text-[#4b3f2f]" />
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-1">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-5 py-3 text-sm font-medium rounded-lg transition-all duration-300 relative mx-2
                ${
                  active
                    ? "bg-gradient-to-r from-[#f1e8dc] to-[#fffaf5] text-[#3e3223] shadow-inner"
                    : "text-[#7a6a55] hover:bg-[#f7f3ee] hover:text-[#3e3223]"
                }`}
              >
                <span
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    active ? "text-[#b6925e]" : "text-[#a8957b]"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#d6b98d] to-[#f1e8dc] opacity-0 group-hover:opacity-100 rounded-r-md transition-opacity duration-300"></span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#e6dfd3]">
          <button
            onClick={Logout}
            className="flex items-center gap-3 px-3 py-2 text-[#b33a3a] hover:bg-[#f9eaea] w-full rounded-md transition-all"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#e6dfd3] bg-white/70 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-[#f6f3ef] transition"
            >
              <Bars3Icon className="w-5 h-5 text-[#4b3f2f]" />
            </button>
            <h2 className="text-lg font-semibold tracking-wide text-[#4b3f2f]">
              Dashboard Overview
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-[#7a6a55] truncate max-w-[400px]">
              Welcome, {user?.name}
            </span>
            <img
              src="https://miraggiolife.com/cdn/shop/files/logo_200x@2x.png?v=1690893751"
              alt="Miraggio"
              className="h-8 w-auto"
            />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


