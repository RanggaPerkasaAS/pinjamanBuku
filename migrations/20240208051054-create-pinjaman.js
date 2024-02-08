'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pinjaman', {
      id_pinjaman: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_member: {
        type: Sequelize.INTEGER
      },
      id_book: {
        type: Sequelize.INTEGER
      },
      tanggal_pinjam: {
        type: Sequelize.DATE
      },
      tanggal_pengembalian: {
        type: Sequelize.DATE
      },
      is_returned: {
        type: Sequelize.BOOLEAN
      },
      penalty_applied: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pinjamans');
  }
};