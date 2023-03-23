const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequalize");

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    lname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    mobile: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}

const User = sequelize.define("User", attributes, {
    tableName: "user",
    timestamps: false,
});


module.exports = User;