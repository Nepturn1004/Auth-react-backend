const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {}

  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.STRING,
      accessToken: DataTypes.STRING(512),
      refreshToken: DataTypes.STRING(512)
    },
    {
      sequelize,
      modelName: 'Token'
    }
  );

  return Token;
};
