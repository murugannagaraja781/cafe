const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// POST /api/sales - save a new sale
router.post("/", async (req, res) => {
  try {
    const { cart, total } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newSale = new Sale({
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    });

    await newSale.save();

    res.status(201).json({ message: "Sale saved successfully", sale: newSale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
