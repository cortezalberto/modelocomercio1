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
     await queryInterface.bulkInsert('Sizes', [
      {id:1, name: "XLL"},
      {id:2, name: "S"},
      {id:3, name: "M"},
      {id:4, name: "XL"},
      {id:5, name: "SM"},
      {id: 6, name: '41'},
      {id: 7, name: '42'},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Sizes', null, {});
  }
};
