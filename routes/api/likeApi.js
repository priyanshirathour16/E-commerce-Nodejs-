const express = require("express");
const router = express.Router();
const userModel = require("../../models/user");
const { isLoggedIn } = require("../../middlewareSchema");

router.post("/products/:productId/like", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  const isLike = req.user.wishList.includes(productId);

  if (isLike) {
    req.user = await userModel.findByIdAndUpdate(
      user._id,
      { $pull: { wishList: productId } },
      { new: true }
    );
  } else {
    req.user = await userModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { wishList: productId } },
      { new: true }
    );
  }

  res.json({
    success: true,
  });
});

module.exports = router;
