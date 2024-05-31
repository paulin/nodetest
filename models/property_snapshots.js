const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_snapshots', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cherre_dw_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    one_line_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sqft: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lot_sqft: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    basement_sqft: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    garage_car_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stories_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cherre_avm_estimate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    region_neighborhood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    region_city_fips_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    region_county_fips_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    region_msa_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pipedrive_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_change_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    last_change_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bed_count: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    bath_count: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    photo_ids: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'property_snapshots',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "property_id",
        unique: true,
        fields: [
          { name: "property_id" },
        ]
      },
      {
        name: "property_snapshots_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
