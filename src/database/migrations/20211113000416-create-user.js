'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: "addresses",
          key: "id"
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};