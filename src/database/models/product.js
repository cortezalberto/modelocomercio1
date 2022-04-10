'use strict';

const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      /*    hasMany     */
      this.hasMany(models.Image);

      /*    belongsTo     */
      this.belongsTo(models.Brand);
      this.belongsTo(models.Category);
      this.belongsTo(models.Size);
      this.belongsTo(models.Visibility);
      this.belongsTo(models.Color);
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    stock_max: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER,
    visibilityId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};