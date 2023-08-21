const staticProduct = require("./static-products");
const productModel = require("./models/product");

const dbProduct = async()=>{
    try{
        await productModel.deleteMany({});
       const insertData = await productModel.insertMany(staticProduct);
    }
    catch(err){
       console.log(err);
    }
}

module.exports = dbProduct;