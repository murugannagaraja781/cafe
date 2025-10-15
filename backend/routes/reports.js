const router = require("express").Router();
const Invoice = require("../models/Invoice");
const auth = require("../middleware/authMiddleware");

router.get("/sales", auth, async (req, res) => {
  const invoices = await Invoice.find();
  const total = invoices.reduce((sum, inv) => sum + inv.total, 0);
  res.json({ total, count: invoices.length });
});

module.exports = router;
