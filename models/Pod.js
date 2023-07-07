const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Pod = sequelize.define(
  'Pod',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // To add other model options 
  }
);

module.exports = Pod;
