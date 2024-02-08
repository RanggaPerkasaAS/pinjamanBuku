'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pinjaman, {
        foreignKey: 'id_member',
        as: 'pinjaman' // alias untuk mengakses hubungan
      });
    }
  }
  member.init({
    id_member:{
      type : DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    penality_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'member',
    tableName: 'member',
  });
  return member;
};