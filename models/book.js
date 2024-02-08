'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init({
    id_book: {
      type : DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
    tableName: 'book',
  });
  return book;
};