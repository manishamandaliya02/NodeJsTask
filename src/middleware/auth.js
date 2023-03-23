const jwt = require("jsonwebtoken");
const User = require('../model/user')

//auth-guard
async function authGuard(req, res, next) {
    let token = req.header("x-auth-token");

    if (token && token !== "") {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      let checkEmail = await User.findOne({
        raw: true,
        where: {
          id: decoded.id
        }
      });
      console.log(checkEmail)
     // if(checkEmail){
        next();
      //}
    } else {
      return res.status(401).send({
        responseCode: "99",
        responseDescription: "Access denied. No token provided.",
      });
    }
}

exports.authGuard = authGuard;

