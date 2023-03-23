const Joi = require('joi')

exports.addUserValidate = (user) => {
    const schema = Joi.object({
        fname: Joi.string().required().label("fname"),
        lname: Joi.string().required().label("lname"),
        password: Joi.string().required().label("password"),
        mobile: Joi.string().optional().allow("").label("mobile"),
        email: Joi.string().email().required().label("email"),
    });
    return schema.validate(user);
}


exports.addCategoryValidate = (category) => {
    const schema = Joi.object({
        name: Joi.string().required().label("name"),
    });
    return schema.validate(category);
}

exports.addCategoryItemValidate = (citem) => {
    const schema = Joi.object({
        name: Joi.string().required().label("name"),
        categoryId: Joi.string().required().label("categoryId")
    });
    return schema.validate(citem);
}
