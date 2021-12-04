'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Instructors',[
      {
        email: 'admin@example.com',
        password: 'admin',
        name:'admin',
        surname:'admin',
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'janNowak@example.com',
        password: 'janNowak',
        name:'Jan',
        surname:'Nowak',
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'lenaNowak@example.com',
        password: 'lenaNowak',
        name:'Lena',
        surname:'Nowak',
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Instructors', null, {});
  }
};
