'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Histories', {
      date: {
        type: Sequelize.DATE
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "orders",
          key: "id"
        }
      },
      stateId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true,
        references: {
          model: "states",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Histories');
  }
};