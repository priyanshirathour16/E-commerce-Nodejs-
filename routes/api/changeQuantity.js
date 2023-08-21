const express = require("express");
const router = express.Router();
const userModel = require("../../models/user");
const { isLoggedIn } = require("../../middlewareSchema");

router.post("/products/:productId/decrement", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const user = await userModel.findById(req.user._id);
  const decre = await user.cart.find((item) => {
    return item.productId.toString() === productId;
  });

  if (decre && decre.quantity > 1) {
    decre.quantity--;
  }
  await user.save();
  res.redirect("back");
});

router.post("/products/:productId/increment", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const user = await userModel.findById(req.user._id);

  const cartItem = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });
  if (cartItem) {
    cartItem.quantity++;
  }

  await user.save();
  res.redirect("back");
});

module.exports = router;
