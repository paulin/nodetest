const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('migrations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'migrations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_8c82d7f526340ab734260ea46be",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
