const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');


class Pod extends Model {}

Pod.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
       
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pod',
  }
);

Pod.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Pod, {
  foreignKey: 'userId',
});

module.exports = Pod;

