const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { RAZOR_PAY_ID, RAZOR_PAY_KEY } = process.env;
const Order = require("../../models/order");
const userModel = require("../../models/user");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");
const { isLoggedIn } = require("../../middlewareSchema");

router.post("/order", isLoggedIn, async (req, res) => {
  const instance = new Razorpay({
    key_id: RAZOR_PAY_ID,
    key_secret: RAZOR_PAY_KEY,
  });
  const { amount } = req.body;
  // console.log(amount);
  const { id } = req.body;
  // console.log(id);

  const options = {
    amount: parseInt(amount) * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  await Order.create({
    _id: order.id,
    user: req.user._id,
    amount: amount,
  });
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  // console.log(order);

  user.paymentOrders.push({ id });
  // console.log(typeof parseInt(order.id));
  // user.ordersId.push(order.id);
  user.save();

  res.json({
    success: true,
    order,
  });
});

router.post("/payment-verify", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const isvalid = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    RAZOR_PAY_KEY
  );
  if (isvalid) {
    await Order.findByIdAndUpdate(
      { _id: razorpay_order_id },
      { paymentStatus: true }
    );
    res.redirect("/products");
  } else {
    res.redirect("/products");
  }
});

module.exports = router;
