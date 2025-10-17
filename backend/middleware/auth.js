const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// 🟢 First-time Superadmin creation (no token)
router.post("/create-superadmin", async (req, res) => {
  try {
    const existing = await User.findOne({ role: "superadmin" });
    if (existing)
      return res.status(400).json({ message: "Superadmin already exists" });

    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.create({
      name,
      email,
      password,
      role: "superadmin",
    });
    const token = user.getJwtToken();

    res
      .status(201)
      .json({ message: "Superadmin created successfully", user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟡 Login for all users
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = user.getJwtToken();
    res.json({ token, role: user.role, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟢 Create Admin/Staff (protected, only superadmin)
router.post(
  "/register",
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Email already used" });

      const user = await User.create({ name, email, password, role });
      res.status(201).json({ message: `${role} created successfully`, user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 🟢 Protected routes example
router.get("/profile", isAuthenticatedUser, (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/admin-dashboard",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
  }
);

router.get(
  "/super-dashboard",
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  (req, res) => {
    res.json({ message: "Welcome Super Admin" });
  }
);

router.get(
  "/staff-dashboard",
  isAuthenticatedUser,
  authorizeRoles("staff", "admin", "superadmin"),
  (req, res) => {
    res.json({ message: "Welcome Staff!" });
  }
);

module.exports = router;
