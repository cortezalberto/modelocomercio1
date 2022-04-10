'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order)
      this.belongsTo(models.State)

    }
  };
  History.init({
    date: DataTypes.DATE,
    orderId: {type: DataTypes.INTEGER, primaryKey: true},
    stateId: {type: DataTypes.INTEGER, primaryKey: true}
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};