const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers_buybox_regions', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    market_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    reno_cost_per_sqft: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    closing_cost_pct: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    avg_rent_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    avg_property_tax: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    avg_maintenance_costs: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    cap_rate_min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'customers_buybox_regions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customers_buybox_regions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
