const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('properties', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'properties',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "properties_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
