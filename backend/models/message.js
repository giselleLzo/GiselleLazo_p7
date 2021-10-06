'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User);

      Message.hasMany(models.Comment, {
        foreignKey: {
          allowNull: false
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    }
  };
  Message.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        min: 3,
        notEmpty: true,
      }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        min: 5,
        notEmpty: true,
      }
    },
    attachment: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'username'
      }
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};