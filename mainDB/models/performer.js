'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
        this.hasMany(models.Song,{
          foreignKey: {
            name:'performerId',
            allowNull:false
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
    }
  };
  Performer.init({
    performerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      allowNull: false,
      type: DataTypes.STRING
    },
    musicGenre: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Performer',
  });
  return Performer;
};