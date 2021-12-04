'use strict';

'use strict';

const { DATE } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Assignments',[
      {
        earnings: 499.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
        instructorId: 3
      },
      {
        earnings: 299.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 2,
        instructorId: 3
      },
      {
        earnings: 499.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
        instructorId:3 
      },
      {
        earnings: 299.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 4,
        instructorId: 2
      },
      {
        earnings: 599.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 5,
        instructorId: 2
      },
      {
        earnings: 299.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 6,
        instructorId: 2
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Assignments', null, {});
  }
};

