const { Sequelize, sequelize } = require('./index');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    // allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  firstName: {
    type: DataTypes.STRING,
    unique: true,
    // allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
   Projectname: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
   description: {
    type: DataTypes.STRING,
    // allowNull: false,
  }, 
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    // allowNull: false,
  },
  Image :{
   type: DataTypes.BLOB('long')
  //  allowNull: true,
},

},
{
  sequelize,
  modelName: 'User',
  timestamps: true, 
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  });

// User.sync({force:true});

module.exports = User;