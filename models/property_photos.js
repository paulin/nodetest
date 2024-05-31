const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_photos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exif: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    original_imported_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'property_photos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "property_photos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "property_photos_property_id_status",
        fields: [
          { name: "property_id" },
          { name: "status" },
        ]
      },
    ]
  });
};
