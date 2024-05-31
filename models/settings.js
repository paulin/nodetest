const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value_json: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'settings',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "settings_pkey",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
};
