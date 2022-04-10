'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      stock: {
        type: Sequelize.INTEGER
      },
      stock_min: {
        type: Sequelize.INTEGER
      },
      stock_max: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: "brands",
          key: "id"
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id"
        }
      },
      sizeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "sizes",
          key: "id"
        }
      },
      visibilityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "visibilities",
          key: "id"
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        references:{
          model: "colors",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};