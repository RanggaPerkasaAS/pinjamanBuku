'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pinjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.member,{
        foreignKey: "id_member", as: "members"
      })

      this.belongsTo(models.book,{
        foreignKey: "id_book", as: "books"
      })
    }
  }
  pinjaman.init({
    id_pinjaman: {
      type : DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    id_member: DataTypes.INTEGER,
    id_book: DataTypes.INTEGER,
    tanggal_pinjam: DataTypes.DATE,
    tanggal_pengembalian: DataTypes.DATE,
    is_returned: DataTypes.BOOLEAN,
    penalty_applied: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pinjaman',
    tableName: 'pinjaman',
  });
  return pinjaman;
};