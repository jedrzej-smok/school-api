'use strict';

const { DATE } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Recordings',[
      {
        name:'no_1',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
      },
      {
        name:'no_2',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
      },
      {
        name:'no_3',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
      },
      {
        name:'no_4',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
      },
      {
        name:'no_1',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 2,
      },
      {
        name:'no_2',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 2,
      },
      {
        name:'no_1',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
      },
      {
        name:'no_1',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 4,
      },
      {
        name:'no_1',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 5,
      },
      {
        name:'no_1',
        source:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 6,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recordings', null, {});
  }
};
