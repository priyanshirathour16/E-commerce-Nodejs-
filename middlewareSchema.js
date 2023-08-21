const { validatorProductSchema, reviewSchema } = require("./Joi-schema");
const ProductModel = require("./models/product");

module.exports.validateProduct = (req, res, next) => {
  const { name, img, price, desc } = req.body;
  console.log("this is name", name);
  const { error } = validatorProductSchema.validate({ name, img, price, desc });

  if (error) {
    return res.send("error kya hai ", error);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  console.log("rating", rating);
  const { error } = reviewSchema.validate({ rating, comment });
  if (error) {
    return res.send(error);
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.xhr && !req.isAuthenticated()) {
    return res.status(401).json({
      msg: "Please Login !",
    });
  }

  if (!req.isAuthenticated()) {
    req.flash("error", "Please Logged In First !");
    return res.redirect("/login");
  }
  next();
};

module.exports.isProductAuthor = async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);

  if (!product.author || !product.author.equals(req.user._id)) {
    console.error("wrong");
    req.flash("error", "You are not authorized User");
    return res.redirect("back");
  }
  next();
};
