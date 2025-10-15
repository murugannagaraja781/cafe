const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// Add product
router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
