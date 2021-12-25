'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room,{
        foreignKey: {
          allowNull:false,
          name: 'roomId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.Song,{
        foreignKey: {
          allowNull:false,
          name: 'songId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.DanceGenre,{
        foreignKey: {
          allowNull:false,
          name: 'danceGenreId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.Level,{
        foreignKey: {
          allowNull:false,
          name: 'levelId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      // 
      this.hasMany(models.Recording,{
        foreignKey: {
          allowNull:false,
          name: 'courseId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Assignment,{
        foreignKey: {
          allowNull:false,
          name: 'courseId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Registration,{
        foreignKey: {
          allowNull:false,
          name: 'courseId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


    }
  };
  Course.init({
    courseId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true
    },
    price: {
      allowNull:false,
      type:DataTypes.DOUBLE
    },
    numberClasses: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    startTime: {
      allowNull:false,
      type: DataTypes.DATE
    },
    requirements: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Course',
    indexes:[
      {
        name: 'indexCourse',
        using: 'BTREE',
        fields:['name']
      }
    ]
  });
  return Course;
};