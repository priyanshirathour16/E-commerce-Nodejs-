const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, number, role, password } = req.body;
    const isAlready = await userModel.findOne({ email });
    if (isAlready) {
      req.flash(
        "error",
        "User is already Present ! signup with different email"
      );
      res.redirect("back");
      return;
    }
    const user = new userModel({ username, email, number, role });
    await userModel.register(user, password);
    req.flash("success", "Please Login! you are successfullt signup 😍");
    res.redirect("/login");
  } catch (err) {
    req.flash("error", " Invalid Credentials !!");
    res.render("products/error", { err });
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `welcome ! ${req.user.username} 🖐️`);
    res.redirect("/products");
  }
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logout Successfully");
    res.redirect("/products");
  });
});

module.exports = router;
