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
    categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(200),
        allowNull: true,
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

const CategoryItem = sequelize.define("CategoryItem", attributes, {
    tableName: "categoryItem",
    timestamps: false,
});


module.exports = CategoryItem;