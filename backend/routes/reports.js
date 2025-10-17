// ...existing code
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");

// Profit & Loss
router.get(
  "/profit-loss",
  auth,
  authorizeRoles(["admin", "superadmin"]),
  async (req, res) => {
    const sales = await Sale.find();
    const salesTotal = sales.reduce((sum, sale) => sum + sale.total, 0);

    const purchases = await Purchase.find();
    const purchaseTotal = purchases.reduce((sum, p) => sum + p.totalCost, 0);

    const profit = salesTotal - purchaseTotal;
    res.json({
      salesTotal,
      purchaseTotal,
      profit,
      loss: profit < 0 ? Math.abs(profit) : 0,
    });
  }
);

// Best Sellers
router.get(
  "/best-sellers",
  auth,
  authorizeRoles(["admin", "superadmin"]),
  async (req, res) => {
    const sales = await Sale.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: { product: "$items.name", size: "$items.size" },
          totalSold: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      { $sort: { totalSold: -1 } },
    ]);
    res.json(sales);
  }
);
