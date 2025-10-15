const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  priceSmall: Number,
  priceBig: Number,
  img: String,
});

module.exports = mongoose.model("Product", productSchema);
