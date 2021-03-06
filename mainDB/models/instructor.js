'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.DanceGenre,{
        foreignKey:'fkInstructorId',
        through:'InstructorAndGenre'
      });

      this.hasMany(models.Assignment,{
        foreignKey: {
          allowNull:false,
          name: 'instructorId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Instructor.init({
    instructorId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail:true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Instructor',
    indexes:[
      {
        name: 'indexInstructor',
        using: 'BTREE',
        fields:['email']
      }
    ]
  });
  return Instructor;
};