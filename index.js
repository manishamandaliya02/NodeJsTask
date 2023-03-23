const express = require('express');
const routes = require('./src/routes/index');
const { config } = require('./config/index');
const app = express();
const bodyParser = require('body-parser');
const cronFile = require("./src/cron/index");


app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(`/api`, routes);

const PORT = config.PORT;
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));

process.on('uncaughtException', function (err) {
    console.error("Uncaught exception occurred, Node NOT Exiting...", err.stack);
});
