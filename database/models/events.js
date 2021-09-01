const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../connection')

class Event extends Model{

}
Event.init({
    eventid:{type: DataTypes.STRING, allowNull: false, primaryKey:true, unique: true},
    name:{ type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, defaultValue:'No description'},
    hostemail:{type :DataTypes.STRING, allowNull: false},
    creationdate: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    admin:{type: DataTypes.STRING, allowNull : false,},
    hostsocietyname: {type: DataTypes.STRING, allowNull: false},
    societyid:{type: DataTypes.STRING, allowNull: false},
    intrestcount:{type: DataTypes.INTEGER, defaultValue: 0},
    eventDate: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW},
    startingTime:{type: DataTypes.TIME,allowNull: false},
    endingTime:{type: DataTypes.TIME,allowNull: false},
    isonline:{type: DataTypes.BOOLEAN, defaultValue:true},
    totalParticipants: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false}

},{sequelize, modelName:'Events'})
module.exports = Event
