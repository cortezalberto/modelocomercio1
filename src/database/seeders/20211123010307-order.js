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
     await queryInterface.bulkInsert('Orders', [
      {id:1 ,number: "1", date: new Date(), total: 1500, paymentId: 2, userId: 2, shippingId: 1, stateId: 4},
      {id:2 ,number: "2", date: new Date(), total: 800, paymentId: 3, userId: 2, shippingId: 1, stateId: 4},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Orders', null, {});
  }
};
