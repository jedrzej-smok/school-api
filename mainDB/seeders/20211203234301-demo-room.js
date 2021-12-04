'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms',[
      {
        name:'jedynka',
        capacity:300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'dwójka',
        capacity:300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'trójka',
        capacity:300,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};