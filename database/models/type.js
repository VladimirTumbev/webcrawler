'use strict';
module.exports = (sequelize, DataTypes) => {
  const type = sequelize.define('type', {
    name: {
      type: DataTypes.STRING,
    },
  }, {});
  type.associate = (models) => {
    // associations can be defined here
  };
  return type;
};
