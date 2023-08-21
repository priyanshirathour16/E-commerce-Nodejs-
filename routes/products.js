const express = require("express");
const ProductModel = require("../models/product");
const router = express.Router();
const Review = require("../models/reviews");
const {
  validateProduct,
  isLoggedIn,
  isProductAuthor,
} = require("../middlewareSchema");

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.render("products/index", { products });
  } catch (e) {
    res.render("products/error", { err: e.message });
  }
});

router.get("/products/new", isLoggedIn, (req, res) => {
  try {
    res.render("products/productAdd");
  } catch (e) {
    res.render("products/error", { err: e.message });
  }
});

router.post("/products", isLoggedIn, validateProduct, async (req, res) => {
  try {
    await ProductModel.create({ ...req.body, author: req.user._id });
    req.flash("success", "product is successfull created");
    res.redirect("products");
  } catch (e) {
    req.flash("success", "product is not created");
    res.render("products/error", { err: e.message });
    // res.redirect("back")
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id).populate("reviews");
    const productAuthor = await ProductModel.findById(id).populate("author");

    res.render("products/show", { product, productAuthor });
  } catch (e) {
    res.render("products/error", { err: e.message });
  }
});

router.get("/products/:id/edit", isProductAuthor, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    req.flash("success", "data is successfully added");
    res.render("products/edit", { product });
  } catch (e) {
    req.flash("success", "product is not created");
    res.render("products/error", { err: e.message });
  }
});

router.patch("/products/:id", isLoggedIn, isProductAuthor, async (req, res) => {
  try {
    const { id } = req.params;

    await ProductModel.findByIdAndUpdate(id, req.body);
    res.redirect(`/products/${id}`);
  } catch (e) {
    res.render("products/error", { err: e.message });
  }
});

router.delete(
  "/products/:id",
  isLoggedIn,
  isProductAuthor,
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      for (let reviewId of product.reviews) {
        await Review.findByIdAndDelete(reviewId);
      }
      await ProductModel.findByIdAndDelete(id);

      req.flash("success", " product is deleted successfully ");
      res.redirect(`/products`);
    } catch (e) {
      res.render("products/error", { err: e.message });
    }
  }
);

router.get("/review/:id", async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  res.redirect("back");
});

module.exports = router;
