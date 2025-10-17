const router = require("express").Router();
const Stack = require("../models/Stack");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// List stacks
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    const stacks = await Stack.find();
    res.json(stacks);
  }
);

// Add/update stack
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    const { item, quantity, unit, costPrice } = req.body;
    let stack = await Stack.findOne({ item });
    if (stack) {
      stack.quantity += quantity;
      stack.costPrice = costPrice;
      await stack.save();
    } else {
      stack = await Stack.create({ item, quantity, unit, costPrice });
    }
    res.json(stack);
  }
);

module.exports = router;
