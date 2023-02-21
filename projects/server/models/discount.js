'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      discount.belongsTo(models.products, {
        foreignKey: 'product_id'
      })
      discount.hasMany(models.discount_category, {
        foreignKey: 'discount_id'
      })
      discount.belongsTo(models.admin, {
        foreignKey: 'admin_id'
      })
    }
  }
  discount.init({
    discount_name: DataTypes.STRING,
    voucher_value: DataTypes.STRING,
    type: DataTypes.STRING,
    expiry_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};
