'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Order)
      this.belongsTo(models.Product)

    }
  };
  Detail.init({
    quantity: DataTypes.DECIMAL,
    subtotal: DataTypes.DECIMAL,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detail'
  });
  return Detail;
};