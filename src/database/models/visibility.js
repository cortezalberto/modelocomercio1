'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Visibility extends Model {
    static associate(models) { }
  };
  Visibility.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Visibility',
    timestamps: false
  });
  return Visibility;
};