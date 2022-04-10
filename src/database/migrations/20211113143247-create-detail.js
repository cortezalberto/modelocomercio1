'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id"
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Details');
  }
};