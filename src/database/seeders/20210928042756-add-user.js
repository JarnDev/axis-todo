'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Auths', [
      {
        name: 'teste',
        login: 'teste',
        password: bcrypt.hashSync('1234', 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Auths', { login: 'teste' }, {});
  },
};
