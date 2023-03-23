const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequalize");

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}

const Category = sequelize.define("Category", attributes, {
    tableName: "category",
    timestamps: false,
});


module.exports = Category;