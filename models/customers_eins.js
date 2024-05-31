const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers_eins', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    ein: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'customers_eins',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customers_eins_ein",
        unique: true,
        fields: [
          { name: "customer_id" },
          { name: "ein" },
        ]
      },
      {
        name: "customers_eins_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
