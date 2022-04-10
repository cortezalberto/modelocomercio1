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
     await queryInterface.bulkInsert('States', [
      {id:1 ,description: "Created"},//Creado
      {id:2 ,description: "Accepted"},//Aceptado
      {id:3 ,description: "Invoiced"},//Facturado
      {id:4 ,description: "Delivered"},//Entregado
      {id:5 ,description: "Canceled"}//Cancelado
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('States', null, {});
  }
};
