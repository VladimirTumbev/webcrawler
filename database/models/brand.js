'use strict';
module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  brand.associate = (models) => {
    // associations can be defined here
  };
  return brand;
};
