const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://manishamandaliya02:<password>@cluster0.gubrrer.mongodb.net/test')
.then(sucess => {
    console.log("connected with mongo server...")
})
.catch(error => {
    console.log("error while connecting to database...")
})
module.exports = mongoose;