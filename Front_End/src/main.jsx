import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Home/HomePage.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";

import MainTote from "./Bag-Components/Tote-Bags/MainTote.jsx";
import Tote from "./Bag-Components/Tote-Bags/Tote.jsx";

import Shoulder from "./Bag-Components/Shulder-Bag/Shoulder.jsx";
import MainShoulder from "./Bag-Components/Shulder-Bag/MainShoulder.jsx";

import TopHandle from "./Bag-Components/TopHandle-Bag/TopHandle.jsx";
import MainTopHandle from "./Bag-Components/TopHandle-Bag/MainTopHandle.jsx";

import CrossBody from "./Bag-Components/CrossyBody-Bag/CrossyBody.jsx";
import MainCrossyBody from "./Bag-Components/CrossyBody-Bag/MainCrossyBody.jsx";

import MainMini from "./Bag-Components/Mini-Bag/MainMini.jsx";
import Mini from "./Bag-Components/Mini-Bag/MIni.jsx";

import AllBags from "./Bag-Components/All-Bags/Allbags.jsx";
import MainAllBags from "./Bag-Components/All-Bags/MainAllBags.jsx";

import SearchBox from "./Navbar-Section/SearchBox.jsx";
import Cart from "./Navbar-Section/Cart.jsx";
import Profile from "./Navbar-Section/Profile.jsx";
import DetailsPage from "./Pages/DetailsPage.jsx";
import WishList from "./Navbar-Section/wishList.jsx";
import CheckOut from "./Pages/CheckOut.jsx";
import OrderSuccess from "./Pages/OrderSucess.jsx";
import ViewOrder from "./Pages/ViewOrder.jsx";
import BuyProduct from "./Pages/BuyProduct.jsx";

import Dashnboard from "./Dashboard/DashnboardLayout.jsx";
import DashboardHome from "./Dashboard/DashboardHome.jsx";
import DashnboardLayout from "./Dashboard/DashnboardLayout.jsx";
import DashboardUser from "./Dashboard/DashboardUser.jsx";
import DashboardProduct from "./Dashboard/DashboardProduct.jsx";
import EditProduct from "./Dashboard/Components/SetProduct.jsx";
import SetProduct from "./Dashboard/Components/SetProduct.jsx";
import SetCart from "./Dashboard/Components/SetCart.jsx";
import SetWishList from "./Dashboard/Components/SetWishList.jsx";
import SetOrder from "./Dashboard/Components/SetOrder.jsx";
import DashboardOrder from "./Dashboard/DashboardOrder.jsx";

import UserRouter from "./Router/UserRouter.jsx";
import AdminRouter from "./Router/AdminRouter.jsx";
import DashboardLayout from "./Dashboard/DashnboardLayout.jsx";
import MainBag from "./Bag-Components/MainBag.jsx";
import VideoSlide from "./Pages/VideoSlide.jsx";

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
      { path: "Tote", element: <Tote /> },
      { path: "MainTote", element: <MainTote /> },
      { path: "Shoulder", element: <Shoulder /> },
      { path: "MainShoulder", element: <MainShoulder /> },
      { path: "TopHandle", element: <TopHandle /> },
      { path: "MainTopHandle", element: <MainTopHandle /> },
      { path: "CrossBody", element: <CrossBody /> },
      { path: "MainCrossBody", element: <MainCrossyBody/> },
      { path: "Mini", element: <Mini /> },
      { path: "MainMini", element: <MainMini /> },
      { path: "Allbag", element: <AllBags /> },
      { path: "MainAllbag", element: <MainAllBags /> },
      { path: "SearchBox", element: <SearchBox /> },
      { path: "Detailpage/:product_id", element: <DetailsPage /> },
      { path: "catagory", element: <MainBag/> },
      { path: "videoslide", element: <VideoSlide/> },
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
          { path: "vieworder/:orderId", element: <ViewOrder /> },
          { path: "buyproduct/:product_id", element: <BuyProduct /> },
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
            element: <DashboardLayout/>,

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
              { path: "setcart", element: <SetCart /> },
              { path: "setwishlist", element: <SetWishList /> },
              { path: "setorder", element: <SetOrder /> },
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
  </StrictMode>
);
