const router = require('express').Router();
const path = require("path");
const { authGuard } = require('../middleware/auth')
const UserController = require("../controller/user.controller");

const multer = require('multer');
const CategoryController = require('../controller/category.controller');
const ConvertController = require('../controller/convert.controller');

const SUPPORTED_FILE_TYPES = ['.JPG', '.jpeg','.png'];

const images = multer.diskStorage({
    destination: "./images/",
    filename: (request, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: images,
    fileFilter: function (req, file, callback) {
        console.log('file from multer', file);
        const fileExt = path.extname(file.originalname);
        if (SUPPORTED_FILE_TYPES.indexOf(fileExt) > -1) {

        } else {
            callback(null, false);
        }
        callback(null, true);
    },
});

//User APIs
router.post('/register',  UserController.register);
router.post('/userLogin', UserController.userlogin);

// Category APIs
router.post('/addCategory', authGuard,CategoryController.addCategory);
router.get('/categoryList', authGuard,CategoryController.categoryList);

// Category Items APIs
router.post('/addCategoryItems',authGuard, upload.array('image', 1),CategoryController.addCategoryItems);
router.get('/getItemByCategory/:categoryId', authGuard,CategoryController.getItemByCategory);

// Mysql to Mongo
router.get('/importMysqlToMongo', ConvertController.importMysqlToMongo);

module.exports = router;