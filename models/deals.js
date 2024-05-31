const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deals', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    buyer_customer_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    pipedrive_deal_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'deals',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "deals_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
