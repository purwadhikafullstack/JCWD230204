'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      discounts.belongsTo(models.products, {
        foreignKey: 'product_id'
      })
      discounts.hasMany(models.discount_category, {
        foreignKey: 'discount_id'
      })
      discounts.belongsTo(models.admin, {
        foreignKey: 'admin_id'
      })
    }
  }
  discounts.init({
    name: DataTypes.STRING,
    voucher_value: DataTypes.STRING,
    type: DataTypes.STRING,
    exppiry_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'discounts',
  });
  return discounts;
};