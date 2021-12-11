'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Course,{
        foreignKey: 'levelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Level.init({
    levelId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};