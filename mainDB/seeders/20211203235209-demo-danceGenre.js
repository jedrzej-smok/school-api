'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DanceGenres',[
      {
        name:'Taniec klasyczny',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Taniec towarzyski',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Taniec współczesny',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DanceGenres', null, {});
  }
};