const express = require("express");
const User = require("../models/User");
const router = express.Router();

// --------------------
// 1️⃣ Create First Superadmin (No token needed)
// --------------------
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

    res.status(201).json({ message: "Superadmin created!", user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------
// 2️⃣ Login
// --------------------
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

module.exports = router;
