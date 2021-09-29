'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [
      {
        name: 'Create Todo',
        date: '2021-09-28T16:08:45.257Z',
        createdBy: 1,
        picture: 'default',
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
    return queryInterface.bulkDelete(
      'Todos',
      { name: 'Create Todo', createdBy: 1 },
      {},
    );
  },
};
