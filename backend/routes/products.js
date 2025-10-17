const router = require("express").Router();
const Product = require("../models/Product");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Add product (admin/superadmin)
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
