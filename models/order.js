const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    services: { type: String },
    status: { type: String },
    user: { type: String },
    address: { type: String },
    brand: { type: String },
    model: { type: String },
    fuel: { type: String },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Orders", orderSchema);
module.exports = orderModel;
