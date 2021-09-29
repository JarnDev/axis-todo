'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        name: 'Task 1',
        todoId: 1,
        status: 'OPEN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 2',
        todoId: 1,
        status: 'IN_PROGRESS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 3',
        todoId: 1,
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
