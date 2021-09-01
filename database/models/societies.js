const { DataTypes, Model} = require('sequelize')
const {sequelize} = require('../connection')
const User = require('./user');

class Socities extends Model{

}
Socities.init({
    societyid:{type: DataTypes.STRING, allowNull: false, primaryKey:true, unique: true,},
    name:{ type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, defaultValue:'No description'},
    university:{type: DataTypes.STRING, allowNull: false},
    department: {type: DataTypes.STRING, allowNull: false},
    adminEmail:{type :DataTypes.STRING, allowNull: false, validate:{
        isEmail: true
    }},
    creationdate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    admin:{type: DataTypes.STRING, allowNull : false},
    goals:{type: DataTypes.TEXT, allowNull: false},
    societytype: {type: DataTypes.STRING, allowNull: false},
   // logo : {type: DataTypes.STRING, allowNull: false}

},{sequelize, modelName:'Societies'})

module.exports = Socities

