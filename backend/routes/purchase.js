const router = require("express").Router();
const Purchase = require("../models/purchases");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Get purchases (admin/superadmin)
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    const purchases = await Purchase.find();
    res.json(purchases);
  }
);

// Add purchase
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    const { item, quantity, unit, totalCost } = req.body;
    const purchase = await Purchase.create({ item, quantity, unit, totalCost });
    res.json(purchase);
  }
);

module.exports = router;
