const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Book = sequelize.define("Book", {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  publicationDate: { type: DataTypes.DATEONLY, allowNull: false },
  isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = Book;
