'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) { }
  };
  Brand.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
    timestamps: false
  });
  return Brand;
};