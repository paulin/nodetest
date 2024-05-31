const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deals_listings', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    deal_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'deals_listings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "deals_listings_deal_id_listing_id",
        unique: true,
        fields: [
          { name: "deal_id" },
          { name: "listing_id" },
        ]
      },
      {
        name: "deals_listings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
