require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const invoiceRoutes = require("./routes/invoices");
const reportRoutes = require("./routes/reports");
const saleRoutes = require("./routes/sales");
const stackRoutes = require("./routes/stacks");
const purchaseRoutes = require("./routes/purchases");

app.use("/api/stacks", stackRoutes);
app.use("/api/purchases", purchaseRoutes);
const app = express();

// Global CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Only needed if you use cookies/auth
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
app.use("/api/stacks", stackRoutes);
app.use("/api/purchases", purchaseRoutes);

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
