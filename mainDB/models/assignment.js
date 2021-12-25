'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Course,{
        foreignKey: {
          allowNull:false,
          name: 'courseId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.Instructor,{
        foreignKey: {
          allowNull:false,
          name: 'instructorId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  };
  Assignment.init({
    assignmentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    earnings: {
      allowNull:false,
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'Assignment',
    indexes:[
      {
        name: 'indexAssignment',
        using: 'BTREE',
        fields:['courseId', 'instructorId']
      }
    ]
  });
  return Assignment;
};