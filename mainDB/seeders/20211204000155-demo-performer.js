'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Performers',[
      {
        name:'Piotr Czajkowski',
        musicGenre:'balet klasyczny',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Shakira',
        musicGenre:'pop latynoski',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Sanah',
        musicGenre:'indie pop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Performers', null, {});
  }
};
