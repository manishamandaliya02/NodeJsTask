const Sequelize = require("sequelize");

const dbConfig = {
    username: "root",
    password: "",
    db: "nodejstask",
    host: "localhost",
};
const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: "mysql",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            handleDisconnects: true,
        },
    }
);
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

sequelize.sync({ force: false }).then
    (() => {
        console.log("Database synced");
    }).catch
    ((err) => {
        console.log("Error creating database: " + err);
    });


module.exports = sequelize;