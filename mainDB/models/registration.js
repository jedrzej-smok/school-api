'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
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
      this.belongsTo(models.Participant,{
        foreignKey: {
          allowNull:false,
          name: 'participantId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Registration.init({
    registrationId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    attendance: {
      defaultValue:0,
      allowNull:false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Registration',
    indexes:[
      {
        name: 'indexRegistration',
        using: 'BTREE',
        fields:['courseId', 'participantId']
      }
    ]
  });
  return Registration;
};