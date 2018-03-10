'use strict';
module.exports = (sequelize, DataTypes) => {
  const source = sequelize.define('source', {
    source_name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  source.associate = function(models) {
    // associations can be defined here
  };
  return source;
};
