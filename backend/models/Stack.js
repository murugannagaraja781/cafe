const mongoose = require("mongoose");
const stackSchema = new mongoose.Schema({
  item: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: "pcs" },
  costPrice: { type: Number, required: true },
});
module.exports = mongoose.model("Stack", stackSchema);
