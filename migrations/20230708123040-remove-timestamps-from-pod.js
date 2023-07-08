'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pod', 'createdAt');
    await queryInterface.removeColumn('pod', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pod', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('pod', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
