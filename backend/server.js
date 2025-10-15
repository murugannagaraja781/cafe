require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const invoiceRoutes = require("./routes/invoices");
const reportRoutes = require("./routes/reports");
const saleRoutes = require("./routes/sales");

const app = express();

// Global CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Only needed if you use cookies/auth
//   })
// );
app.use(
  cors({
    origin: "http://localhost:5173", // or use '*' to allow all origins (not recommended for production)
    credentials: true, // if you use cookies/sessions
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/reports", reportRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running")
    );
  })
  .catch((err) => console.error(err));

// Simple test route
app.get("/", (req, res) => res.send("Server is running!"));
