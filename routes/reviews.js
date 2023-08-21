const express = require("express");
const router = express.Router();
const Review = require("../models/reviews");
const ProductModel = require("../models/product");
const { validateReview, isLoggedIn } = require("../middlewareSchema");

router.post(
  "/products/:productId/review",
  isLoggedIn,
  validateReview,

  async (req, res) => {
    try {
      const { productId } = req.params;
      const newReview = new Review({ ...req.body, author: req.user.username });
      await newReview.save();

      const product = await ProductModel.findById(productId);
      product.reviews.push(newReview);

      await product.save();
      await newReview.save();
      req.flash("success", " Your review Added successfully !!");
      res.redirect("back");
    } catch (e) {
      res.redirect("back");
      // res.render('/products/error' , {err: e.message});
    }
  }
);

module.exports = router;
