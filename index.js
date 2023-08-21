require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const views_path = path.join(__dirname, "views");
const static_path = path.join(__dirname, "public");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const userRoute = require("./routes/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel = require("./models/user");
const likeApi = require("./routes/api/likeApi");
const addtocart = require("./routes/userApi");
const changeQuantity = require("./routes/api/changeQuantity");
const paymentApi = require("./routes/api/paymentApi");
const MongoStore = require("connect-mongo");
require("./db/connect");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", views_path);

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/e-commerce",
    }),
    secret: "I am priyanshi",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(productRoutes);
app.use(reviewRoutes);
app.use(userRoute);
app.use(likeApi);
app.use(paymentApi);
app.use(changeQuantity);
app.use(addtocart);

app.listen(PORT, () => {
  console.log("Server is listen on port - ", PORT);
});
