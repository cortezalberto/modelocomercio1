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
     await queryInterface.bulkInsert('Images', [
      {
        id:1, 
        name: "https://static.wikia.nocookie.net/ben10/images/8/83/XLR8OS.png/revision/latest?cb=20170421232446&path-prefix=es", 
        productId: 1 },
      {
        id:2, 
        name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKiMHUTFKepV47yowm9jYldBSLamH-4duNAw_8IvdjHCXuCNL1-gI0ajGpSTEloLF-vk&usqp=CAU", 
        productId: 2, 
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
     await queryInterface.bulkDelete('Images', null, {});
  }
};
