'use strict';

const { DATE } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses',[
      {
        name:'Kurs baletu dla dorosłych',
        price: 199.99,
        numberClasses: 5,
        startTime: new Date("2012-03-12"),
        requirements:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 1,
        songId: 1,
        danceGenreId: 1,
        levelId: 1
      },
      {
        name:'Kurs baletu dla dorosłych cz.2',
        price: 99.99,
        numberClasses: 2,
        startTime: new Date("2014-06-02"),
        requirements:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 1,
        songId: 2,
        danceGenreId: 1,
        levelId: 2
      },
      {
        name:'Kurs samby cz.1',
        price: 399.99,
        numberClasses: 12,
        startTime: new Date("2019-03-01"),
        requirements:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 2,
        songId: 3,
        danceGenreId: 2,
        levelId: 1
      },
      {
        name:'Kurs samby cz.2',
        price: 199.99,
        numberClasses: 5,
        startTime: new Date("2019-12-01"),
        requirements:'cz.1',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 2,
        songId: 4,
        danceGenreId: 2,
        levelId: 2
      },
      {
        name:'Kurs tańca współczesnego cz.1',
        price: 199.99,
        numberClasses: 10,
        startTime: new Date("2016-03-11"),
        requirements:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 3,
        songId: 5,
        danceGenreId: 3,
        levelId: 1
      },
      {
        name:'Kurs tańca współczesnego cz.2',
        price: 99.99,
        numberClasses: 2,
        startTime: new Date("2018-03-12"),
        requirements:'brak',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 3,
        songId: 6,
        danceGenreId: 3,
        levelId: 2
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
