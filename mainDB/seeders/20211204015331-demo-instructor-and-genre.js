'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InstructorAndGenre',[
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        fkGenreId:2,
        fkInstructorId:2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        fkGenreId:3,
        fkInstructorId:2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        fkGenreId:1,
        fkInstructorId:3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        fkGenreId:2,
        fkInstructorId:3
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InstructorAndGenre', null, {});
  }
};
