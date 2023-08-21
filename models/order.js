const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userReg",
  },
  amount: Number,
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
