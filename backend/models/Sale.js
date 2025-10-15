const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        size: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
