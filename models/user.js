const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("invalid Email !!");
      }
    },
  },

  number: {
    type: Number,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    default: "buyer",
  },
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  paymentOrders: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      date: {
        type: Date,
        default: new Date().getDay(),
      },
    },
  ],
  // ordersId: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Order",
  //   },
  // ],
});

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("userReg", userSchema);

module.exports = userModel;
