const  joi = require("joi");


module.exports.validatorProductSchema = joi.object({
    name : joi.string().required(),
    img : joi.string().required(),
    price : joi.number().min(0).required(),
    desc : joi.string().required()
})


module.exports.reviewSchema = joi.object({
    rating :joi.number().min(0).max(5),
    comment : joi.string().required()
})
