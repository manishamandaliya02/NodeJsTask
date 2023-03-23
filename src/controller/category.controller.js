const Category = require("../model/category");
const CategoryItem = require("../model/categoryItem");
const { addCategoryValidate,addCategoryItemValidate } = require("../middleware/validation");
const jwt = require("jsonwebtoken");
const _ = require("underscore");

class CategoryController {

    //all category list
    static async categoryList(req, res) {
        try {
            let token = req.header("x-auth-token");
            if (!token) {
                return res.status(401).send({ status: false, message: "You are not logged in, Please login first" });
            }

            const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY)

            let whereClause = 'WHERE userId='+decoded.id;

            const totalData = await Category.sequelize.query('SELECT * FROM category ' + whereClause, {
                raw: true,
                type: Category.sequelize.QueryTypes.SELECT
            });

            if (totalData.length > 0) {
                return res.status(200).send({ status: true, message: "Successfully", data: totalData });
            } else {
                return res.status(200).send({ status: false, message: "Category doest not exists!" });
            }
        } catch (ex) {
            console.log(ex);
            return res.status(400).send({ status: false, message: "Something went wrong!" });
        }
    }

    //add category
    static async addCategory(req, res) {
        try {
            const { body } = req;
            const { error } = addCategoryValidate(body);

            if (error) {
                return res.status(200).send({ status: false, message: error });
            }

            let token = req.header("x-auth-token");
            if (!token) {
                return res.status(401).send({ status: false, message: "You are not logged in, Please login first" });
            }

            const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY)

            const payload = {
                name: body.name,
                userId: decoded.id,
                createdAt: Date.now()
            }

           const readData = await Category.create(payload);

            return res.status(200).send({ status: true, message: "Added successfully", data: readData });

        } catch (ex) {
            console.log("ececec +++", ex);
            return res.status(400).send({ status: false, message: "Something went wrong!" });
        }
    }

    //add category item
    static async addCategoryItems(req, res) {
        try {
            const { body,files } = req;
            
            const { error } = addCategoryItemValidate(body);
            
            if (error) {
                return res.status(200).send({ status: false, message: error });
            }

            let token = req.header("x-auth-token");
            if (!token) {
                return res.status(401).send({ status: false, message: "You are not logged in, Please login first" });
            }
            
            const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY)

            let itemImage = '';
            if (!_.isEmpty(files)) {
                itemImage = files[0].filename;
            }
            const payload = {
                name: body.name,
                categoryId: body.categoryId,
                userId: decoded.id,
                image: itemImage,
                createdAt: Date.now(),
            }

            await CategoryItem.create(payload);

            return res.status(200).send({ status: true, message: "Category item added successfully" });

       } catch (ex) {
            return res.status(400).send({ status: false, message: "Something went wrong!" });
        }
    }

    //get item by categroy
    static async getItemByCategory(req, res) {
        try {
            const { params } = req;
        
            let token = req.header("x-auth-token");
            if (!token) {
                return res.status(401).send({ status: false, message: "You are not logged in, Please login first" });
            }

            const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY)

            const readData = await CategoryItem.findAll({
                where: {
                    categoryId: params.categoryId,
                    userId : decoded.id
                }
            });

            return res.status(200).send({ status: true, message: "Successfully", data: readData });

        } catch (ex) {
            return res.status(400).send({ status: false, message: "Something went wrong!" });
        }
    }

}

module.exports = CategoryController;