'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Products', [
      {
        id:1, 
        name: "Nike XRL8", 
        description: 'Nike that make you super fast like alien from Ben 10!!', 
        price: 1500, 
        stock: 150,
        stock_min: 10,
        stock_max: 500,
        brandId: 1,
        categoryId: 1,
        sizeId: 6,
        visibilityId: 1,
        colorId: 4},
      {
        id:2, 
        name: "Shirt Generic", 
        description: 'This Generic shirt make look like you a NPC from GTA!!', 
        price: 800, 
        stock: 100,
        stock_min: 10,
        stock_max: 500,
        brandId: 5,
        categoryId: 3,
        sizeId: 2,
        visibilityId: 1,
        colorId: 5
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products', null, {});
  }
};
