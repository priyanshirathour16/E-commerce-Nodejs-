const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const { isLoggedIn } = require("../middlewareSchema");
const ProductModel = require("../models/product");

router.post("/products/:productId/add", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  const cartitem = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });
  if (cartitem) {
    cartitem.quantity++;
  } else {
    user.cart.push({ productId });
  }
  await user.save();
  req.flash("success", "Item added to your cart Successfully ☺️! ");
  res.redirect("back");
});

router.delete("/user/:productId", async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  const itemIndex = user.cart.findIndex((item) => {
    return item.productId.toString() === productId;
  });
  if (itemIndex !== -1) {
    user.cart.splice(itemIndex, 1);
  }
  await user.save();
  res.redirect("back");
});

router.get("/user/cart", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).populate("cart.productId");
    // console.log(user);

    let totalAmount = 0;
    user.cart.forEach((item) => {
      console.log("price", item.productId.price);
      totalAmount += item.quantity * item.productId.price;
    });

    res.render("products/cart", { user, totalAmount });
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.redirect("back");
  }
});

router.get("/myorder", async (req, res) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId).populate("paymentOrders.id");

  res.render("products/myorder", { user });
});

module.exports = router;
