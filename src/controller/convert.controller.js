const User = require("../model/user");
const CategoryItem = require("../model/categoryItem");
const mongoose = require('mongoose');
const Category = require("../model/category");
const Schema = mongoose.Schema

class ConvertController {

    //convert mysql to mongo
    static async importMysqlToMongo(req, res) {
        try {
            // store user data
            let userdata = await User.findAll({raw:true});            
            const userCollectionSchema = new Schema({}, { strict: false })
            const UserCollection = mongoose.model('user', userCollectionSchema)
            const userCollectionData = new UserCollection(userdata)
            await UserCollection.deleteMany()
            await userCollectionData.save()

            // store category data
            let categorydata = await Category.findAll({raw:true});            
            const categoryCollectionSchema = new Schema({}, { strict: false })
            const CategoryCollection = mongoose.model('category', categoryCollectionSchema)
            const categoryCollectionData = new CategoryCollection(categorydata)
            await CategoryCollection.deleteMany()
            await categoryCollectionData.save()

            // store category item data
            let categoryitemdata = await CategoryItem.findAll({raw:true});            
            const categoryitemCollectionSchema = new Schema({}, { strict: false })
            const CategoryItemCollection = mongoose.model('categoryItem', categoryitemCollectionSchema)
            const categoryItemCollectionData = new CategoryItemCollection(categoryitemdata)
            await CategoryItemCollection.deleteMany()
            await categoryItemCollectionData.save()

            return res.status(200).send({ status: true, message: `Data save successfully.` });
        } catch (ex) {
            console.log(ex);
            return res.status(400).send({ status: false, message: "Something went wrong!" });
        }
    }

}

module.exports = ConvertController;