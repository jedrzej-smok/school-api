'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Instructors',[
      {
        email: 'admin@example.com',
        password: '$2b$10$i.C3hFSKXL9P9arUIbhGiOdSjClabqQem/Dn0ZbP7smtOlTLWUe22',
        name:'admin',
        surname:'admin',
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'janNowak@example.com',
        password: '$2b$10$dMDlAOUz6t6ilv1o1wz0XeqagzmURvCKVvcnfmudh0P0Oy4d32bz6',
        name:'Jan',
        surname:'Nowak',
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'lenaNowak@example.com',
        password: '$2b$10$cBgXhRGSaMxtRrktKTnsxeziXtZ83NCiMJYoQNc4mLgPu09vts2b2',
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
