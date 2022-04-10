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
     await queryInterface.bulkInsert('Shippings', [
      {id:1 ,street: "Generic Street", dni:12312323, number: 155, price: "150", phoneNumber: 1111},//Creado
      {id:2 ,street: "Generic Street 2", dni:12312312, number: 11, price: "Free", phoneNumber: 222},//Aceptado
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Shippings', null, {});
  }
};
