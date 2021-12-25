'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanceGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Instructor,{
        foreignKey:'fkGenreId',
        through:'InstructorAndGenre'
      });

      this.hasMany(models.Course,{
        foreignKey: 'danceGenreId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  DanceGenre.init({
    danceGenreId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:  {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'DanceGenre',
    indexes:[
      {
        name: 'indexDanceGenre',
        using: 'BTREE',
        fields:['name']
      }
    ]
  });
  return DanceGenre;
};