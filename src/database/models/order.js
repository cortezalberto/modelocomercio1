'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Payment)
      this.belongsTo(models.User)
      this.belongsTo(models.Shipping)
      this.belongsTo(models.State)   
    
    }
  };
  Order.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    paymentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    shippingId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};