'use strict';
 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Song.belongsTo(models.Performer,{
          foreignKey: {
            allowNull:false,
            name: 'performerId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        this.hasMany(models.Course,{
          foreignKey: 'songId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
    }
  };
  Song.init({
    songId:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true
    },
    source: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Song',
    indexes:[
      {
        name: 'indexSong',
        using: 'BTREE',
        fields:['title']
      }
    ]
  });
  return Song;
};