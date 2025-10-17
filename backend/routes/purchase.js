const router = require("express").Router();
const Purchase = require("../models/Purchase");
const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get(
  "/",
  auth,
  authorizeRoles(["admin", "superadmin"]),
  async (req, res) => {
    const purchases = await Purchase.find();
    res.json(purchases);
  }
);

router.post(
  "/",
  auth,
  authorizeRoles(["admin", "superadmin"]),
  async (req, res) => {
    const { item, quantity, unit, totalCost } = req.body;
    const purchase = await Purchase.create({ item, quantity, unit, totalCost });
    res.json(purchase);
  }
);
module.exports = router;
