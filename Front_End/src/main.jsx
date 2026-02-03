import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Home/HomePage.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";

import SearchBox from "./Navbar-Section/SearchBox.jsx";
import Cart from "./Navbar-Section/Cart.jsx";
import Profile from "./Navbar-Section/Profile.jsx";
import DetailsPage from "./Pages/DetailsPage.jsx";
import WishList from "./Navbar-Section/wishList.jsx";
import CheckOut from "./Pages/CheckOut.jsx";
import OrderSuccess from "./Pages/OrderSucess.jsx";
import ViewOrder from "./Pages/ViewOrder.jsx";
import BuyProduct from "./Pages/BuyProduct.jsx";

import DashboardHome from "./Dashboard/DashboardHome.jsx";

import DashboardUser from "./Dashboard/DashboardUser.jsx";
import DashboardProduct from "./Dashboard/DashboardProduct.jsx";

import SetProduct from "./Dashboard/Components/SetProduct.jsx";
import SetCart from "./Dashboard/Components/SetCart.jsx";
import SetWishList from "./Dashboard/Components/SetWishList.jsx";
import SetOrder from "./Dashboard/Components/SetOrder.jsx";
import DashboardOrder from "./Dashboard/DashboardOrder.jsx";

import UserRouter from "./Router/UserRouter.jsx";
import AdminRouter from "./Router/AdminRouter.jsx";
import DashboardLayout from "./Dashboard/DashnboardLayout.jsx";
import VideoSlide from "./Pages/VideoSlide.jsx";
import PaymentSection from "./Pages/PaymentSection.jsx";
import MainBagComponent from "./Bag-Components/MainBagComponent.jsx";
import PolicyAccordion from "./Footer-Section/WebDetailsSection.jsx";
import MiniNav from "./Bag-Components/MiniNav.jsx";

// ============================================================================
// 🌍 MAIN ROUTER CONFIGURATION
// ============================================================================
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      // ============================================================================
      // 📌 PUBLIC ROUTES (NO LOGIN REQUIRED)
      // ============================================================================
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "SearchBox", element: <SearchBox /> },
      { path: "Detailpage/:product_id", element: <DetailsPage /> },
      { path: "videoslide", element: <VideoSlide /> },
      { path: "MainBagComponent/:type", element: <MainBagComponent /> },
      { path: "AboutWeb", element: <PolicyAccordion /> },
      // ============================================================================
      // 🔐 USER PROTECTED ROUTES (REQUIRES USER LOGIN)
      // ============================================================================

      {
        element: <UserRouter />,
        children: [
          { path: "cart", element: <Cart /> },
          { path: "profile", element: <Profile /> },
          { path: "wishlist", element: <WishList /> },
          { path: "Checkout", element: <CheckOut /> },
          { path: "order-success/:orderId", element: <OrderSuccess /> },
          { path: "vieworder", element: <ViewOrder /> },
          {path:"/catagory",element:<SearchBox/>},
          { path: "buyproduct/:product_id", element: <BuyProduct /> },
          { path: "paymentSection", element: <PaymentSection /> },
        ],
      },

      // ============================================================================
      // 🛠️ ADMIN PROTECTED ROUTES (ADMIN ONLY ACCESS)
      // ============================================================================
      {
        element: <AdminRouter />,
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,

            // ============================================================================
            // 🚀 ADMIN DASHBOARD CHILD ROUTES (NESTED)
            // ============================================================================
            children: [
              { index: true, element: <DashboardHome /> },
              { path: "user", element: <DashboardUser /> },
              { path: "order", element: <DashboardOrder /> },
              { path: "products", element: <DashboardProduct /> },
              { path: "setproduct/:itemId", element: <SetProduct /> },
              { path: "setproduct", element: <SetProduct /> },
              { path: "setcart/:Id", element: <SetCart /> },
              { path: "setwishlist/:Id", element: <SetWishList /> },
              { path: "setorder/:Id", element: <SetOrder /> },
            ],
          },
        ],
      },
    ],
  },
]);

// ============================================================================
// 📦 APPLICATION ROOT RENDER
// ============================================================================
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ======================================================================= */}
    {/* 🍞 GLOBAL TOAST CONFIGURATION */}
    {/* ======================================================================= */}
    <ToastContainer
      position="bottom-right"
      autoClose={1800}
      theme="dark"
      hideProgressBar={true}
      closeOnClick
      pauseOnHover={false}
      toastClassName="compact-toast"
    />

    <RouterProvider router={Router}></RouterProvider>
  </StrictMode>,
);
