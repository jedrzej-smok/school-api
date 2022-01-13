'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participants',[
      {
        email: 'igaMazur@example.com',
        password: '$2b$10$8AiqqG72EIrL9bINLMAWkOIIePMgr/GdarieJ5tvXcFoFrzK0g1fO',
        name:'Iga',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'igorMazur@example.com',
        password: '$2b$10$vGz95lpdoHeQ6pH.tkjEJew9ZBjPOyPZ6i9SF79491Fib431HVjo6',
        name:'Igor',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'lauraMazur@example.com',
        password: '$2b$10$WKoyzd7b2u7uuBO.WczFWeP9FsjpWdwC3hgy1kD0g2rShBXDaXXua',
        name:'Laura',
        surname:'Mazur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'leonMazur@example.com',
        password: '$2b$10$DgXb8TErEc/WUbpT4zB4Ou9vNfQLqat7uUNcVizpUYM8ZA2l2lrN2',
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
