'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.DECIMAL
      },
      paymentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "payments",
          key: "id"
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      shippingId: {
        type: Sequelize.INTEGER,
        references: {
          model: "shippings",
          key: "id"
        }
      },
      stateId: {
        type: Sequelize.INTEGER,
        references: {
          model: "states",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};