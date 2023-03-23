const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const User = require('../model/user')
const { addUserValidate } = require("../middleware/validation");

class UserController {
    // add user
    static async register(req, res) {
        try {
            const { body } = req;
            console.log(body);
            const { error } = addUserValidate(body);

            if (error) {
                return res.status(400).send({ status: false, message: error });
            }

            const checkEmail = await User.count({
                where: {
                    email: body.email
                }
            });

            if (checkEmail > 0) {
                return res.status(400).send({ status: false, message: "This email is already in use, Please try with another email" });
            }

            await bcrypt.hash(body.password, 10).then(async (hash) => {
                const payload = {
                    fname: body.fname,
                    lname: body.lname,
                    password: hash,
                    email: body.email,
                    mobile: body.mobile,
                    createdAt: Date.now(),
                }

                await User.create(payload);
            });

            return res.status(200).send({ status: true, message: `Successfully register`, });
        } catch (ex) {
            return res.status(400).send({ status: false, message: "Something went wrong!", data: ex });
        }
    }

    //login user
    static async userlogin(req, res) {
        try {
            const { body } = req;
            let checkEmail = await User.findOne({
                raw: true,
                where: {
                    email: body.email
                }
            });
            if (checkEmail) {
                const result = bcrypt.compareSync(body.password, checkEmail.password);
                    if (result) {
                        const token = jwt.sign(
                            { id: checkEmail.id },
                            process.env.JWT_SECRET_KEY
                        );
                        let newObject = checkEmail;

                        newObject.token = token;
                        delete newObject.password;

                        return res.status(200).send({ status: true, message: `Successfully Login`, data: newObject });
                    } else {
                        return res.status(400).send({ status: false, message: "Entered credentials are invalid, Try again" });
                    }

            } else {
                return res.status(400).send({ status: false, message: "Entered credentials are invalid, Try again" });
            }
        } catch (ex) {
            return res.status(400).send({ status: false, message: "Oops! Something went wrong" });
        }
    }
}

module.exports = UserController;