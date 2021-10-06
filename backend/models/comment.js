'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User);

      Comment.belongsTo(models.Message)
    }
  };
  Comment.init({
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'username'
      }
    },
    comment: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        min: 2,
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};