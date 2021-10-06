'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, {
        foreignKey: {
          allowNull: false
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Must be a valid email'
        },
        notEmpty: true,
      },
      unique: {
        msg: 'Email already exist',
      }, 
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,8],
          msg: 'Username must be length 4 - 8 characters'
        },
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    bio: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};