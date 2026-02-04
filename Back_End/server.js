const express = require("express");
const connectDB = require("./Config/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userRoute = require("./Routes/userRoutes.js");
const productRoute = require("./Routes/productRoutes.js");
const cartRoute = require("./Routes/cartRoutes.js");
const wishlistRoute = require("./Routes/wishlistRoutes.js");
const orderRoute = require("./Routes/orderRoutes.js");
const AdminRoute = require("./Routes/Admin/AdminRoutes.js");
const AdminCartRoutes = require("./Routes/Admin/AdminCartRoutes.js");
const AdminOrderRoutes = require("./Routes/Admin/AdminOrderRoutes.js");
const AdminProductRoute = require("./Routes/Admin/AdminProductRoutes.js");
const  AdminWishListRoute = require("./Routes/Admin/AdminWishListRoutes.js");
const PORT = process.env.PORT || 3000;



app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://feather-mound.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/order", orderRoute);
app.use("/api/admin",AdminRoute);
app.use('/api/admin/cart',AdminCartRoutes);
app.use('/api/admin/wishlist',AdminWishListRoute)
app.use('/api/admin/order',AdminOrderRoutes);
app.use('/api/admin/product',AdminProductRoute);
connectDB();

app.listen(PORT, () => {
  console.log("Server Running Sucessfully", PORT);
});
