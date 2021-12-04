'use strict';

'use strict';

const { DATE } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Registrations',[
      {
        attendance: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
        participantId: 1
      },
      {
        attendance: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
        participantId: 3
      },
      {
        attendance: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 2,
        participantId: 1
      },
      {
        attendance: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 2,
        participantId: 3
      },
      //samba
      {
        attendance: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
        participantId: 1
      },
      {
        attendance: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
        participantId: 2
      },
      {
        attendance: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
        participantId: 3
      },
      {
        attendance: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
        participantId: 4
      },
      {
        attendance: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 4,
        participantId: 1
      },
      {
        attendance: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 4,
        participantId: 2
      },
      //wspolczesne
      {
        attendance: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 5,
        participantId: 1
      },
      {
        attendance: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 5,
        participantId: 2
      },
      {
        attendance: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 5,
        participantId: 3
      },
      {
        attendance: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 5,
        participantId: 4
      },
      {
        attendance: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 6,
        participantId: 3
      },
      {
        attendance: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 6,
        participantId: 4
      }
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Registrations', null, {});
  }
};

