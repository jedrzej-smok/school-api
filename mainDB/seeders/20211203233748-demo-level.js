'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Levels',[
      {
        name:'łatwy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'średni',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'trudny',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Levels', null, {});
  }
};