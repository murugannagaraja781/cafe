require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Import route files
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const invoiceRoutes = require("./routes/invoices");
const reportRoutes = require("./routes/reports");
const saleRoutes = require("./routes/sales");
const stackRoutes = require("./routes/stacks");
const purchasesRoutes = require("./routes/purchase");
const User = require("./models/User"); // ✅ Import User model

const app = express();

// ✅ Enable CORS globally
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Register routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/stacks", stackRoutes);
app.use("/api/purchases", purchasesRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ Function to create a default Superadmin
const createDefaultSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "superadmin" });

    if (existingAdmin) {
      console.log("🟢 Superadmin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // Default password

    const newAdmin = await User.create({
      name: "Default Superadmin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("✅ Default Superadmin created successfully:");
    console.log("Email:", newAdmin.email);
    console.log("Password: admin123");
  } catch (error) {
    console.error("❌ Error creating default superadmin:", error.message);
  }
};

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected successfully");

    // Create Superadmin automatically after DB connect
    await createDefaultSuperAdmin();

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
