'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('tbl_books', {
      id:                 { type: Sequelize.DataTypes.UUID,   allowNull: false, primaryKey: true },
      title:              { type: Sequelize.DataTypes.STRING, allowNull: false },
      publishing_company: { type: Sequelize.DataTypes.STRING, allowNull: false },
      picture:            { type: Sequelize.DataTypes.STRING, allowNull: false },
      authors:            { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING)},
      createdAt:          { type: Sequelize.DATE,    defaultValue: new Date() },
      updatedAt:          { type: Sequelize.DATE,    defaultValue: new Date() }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('tbl_books');
  }
};
