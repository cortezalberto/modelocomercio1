'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) { }
  };
  Color.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color'
  });
  return Color;
};