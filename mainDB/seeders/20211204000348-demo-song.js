'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs',[
      {
        title:'Jezioro łabędzie',
        source:'https://www.youtube.com/watch?v=S76CGGPqI3s',
        createdAt: new Date(),
        updatedAt: new Date(),
        performerId:1
      },
      {
        title:'Dziadek do orzechów',
        source:'https://www.youtube.com/watch?v=7yMOPOmXgO8',
        createdAt: new Date(),
        updatedAt: new Date(),
        performerId:1
      },
      {
        title:'La Tortura',
        source:'https://www.youtube.com/watch?v=Dsp_8Lm1eSk',
        createdAt: new Date(),
        updatedAt: new Date(),
        performerId:2
      },
      {
        title:'Whenever, Wherever',
        source:'https://www.youtube.com/watch?v=weRHyjj34ZE',
        createdAt: new Date(),
        updatedAt: new Date(),
        performerId:2
      },
      {
        title:'Ale jazz!',
        source:'https://www.youtube.com/watch?v=hHb3owr6PQg',
        createdAt: new Date(),
        updatedAt: new Date(),
        performerId:3
      },
      {
        title:'etc. (na disco)',
        source:'https://www.youtube.com/watch?v=J3YdO44YNBE',
        createdAt: new Date(),
        updatedAt: new Date(),
        performerId:3
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
