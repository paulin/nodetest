const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers_email_domains', {
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
    top_level_domain: {
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
    tableName: 'customers_email_domains',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customers_email_domains_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "customers_email_domains_top_level_domain",
        unique: true,
        fields: [
          { name: "customer_id" },
          { name: "top_level_domain" },
        ]
      },
    ]
  });
};
