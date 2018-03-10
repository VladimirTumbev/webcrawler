'use strict';
module.exports = (sequelize, DataTypes) => {
  const characteristics = sequelize.define('characteristics', {
    name: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['name', 'value'],
    }],
  });
  characteristics.associate = (models) => {
    // associations can be defined here
  };
  return characteristics;
};
