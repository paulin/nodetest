const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('markets', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cbsa_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estimated_property_tax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insurance_costs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reno_cost_per_sqft: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maintenance_cost_per_sqft: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'markets',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "markets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
