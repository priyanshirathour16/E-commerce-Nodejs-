const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
    .then(()=>{console.log('DB connected!')})
    .catch(err => console.log("DB not connected " , err));

