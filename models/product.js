const mongoose = require("mongoose");
const Review = require("./reviews");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  img: {
    type: String,
    trim: true,
    default: "../images/product.jpg",
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  desc: {
    type: String,
    trim: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userReg",
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
