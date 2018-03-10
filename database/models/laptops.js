'use strict';
module.exports = (sequelize, DataTypes) => {
  const laptops = sequelize.define('laptops', {
    model: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
  }, {});
  laptops.associate = (models) => {
    // associations can be defined here
    const {
      source,
      brand,
      type,
      characteristics,
    } = models;
    laptops.belongsTo(source, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    laptops.belongsTo(brand, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    laptops.belongsTo(type, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    laptops.belongsToMany(characteristics, {
      through: 'laptopsCharacteristics',
    });
    characteristics.belongsToMany(laptops, {
      through: 'laptopsCharacteristics',
    });
  };
  return laptops;
};
