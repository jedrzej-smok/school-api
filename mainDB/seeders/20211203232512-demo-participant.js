'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participants',[
      {
        email: 'igaMazur@example.com',
        password: 'iga',
        name:'Iga',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'igorMazur@example.com',
        password: 'igor',
        name:'Igor',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'lauraMazur@example.com',
        password: 'laura',
        name:'Laura',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'leonMazur@example.com',
        password: 'leon',
        name:'Leon',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Participants', null, {});
  }
};
