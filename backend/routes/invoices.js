const router = require("express").Router();
const Invoice = require("../models/Invoice");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Create invoice
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    try {
      const invoice = await Invoice.create(req.body);
      res.json(invoice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get all invoices
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    const invoices = await Invoice.find().populate("items.product");
    res.json(invoices);
  }
);

module.exports = router;
