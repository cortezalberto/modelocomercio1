'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) { }
  };
  Size.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Size',
    timestamps: false
  });
  return Size;
};