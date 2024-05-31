const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('listings_properties', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'listings_properties',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "listings_properties_listing_id_property_id",
        unique: true,
        fields: [
          { name: "listing_id" },
          { name: "property_id" },
        ]
      },
      {
        name: "listings_properties_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
