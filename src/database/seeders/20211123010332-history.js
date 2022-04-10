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
     await queryInterface.bulkInsert('Histories', [
      {date: new Date(),orderId: 1, stateId: 1},
      {date: new Date(),orderId: 1, stateId: 2},
      {date: new Date(),orderId: 1, stateId: 3},
      {date: new Date(),orderId: 1, stateId: 4},
      {date: new Date(),orderId: 2, stateId: 1},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Histories', null, {});
  }
};
