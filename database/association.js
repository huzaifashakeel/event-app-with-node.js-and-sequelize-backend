const usermodel = require('./models/user')
const eventmodel = require('./models/events')
const societymodel = require('./models/societies')
const signupmodel = require('./models/signup')
const { DataTypes } = require('sequelize')

signupmodel.hasOne(usermodel,{
    sourceKey: 'email',
    foreignKey: {
        type: DataTypes.STRING,
        unique: true,
        name: 'userEmail',
        allowNull: false,
    }
})
usermodel.belongsTo(signupmodel)



societymodel.belongsToMany(usermodel, {
    sourceKey: 'societyid',
    foreignKey:{
        name:'societyid',
        type: DataTypes.STRING,
        allowNull: false,
    }, through:"SocietyMembers"
})
usermodel.belongsToMany(societymodel, {
    sourceKey: 'userEmail',
    foreignKey: {
        name: 'userEmail',
        type: DataTypes.STRING,
        allowNull: false,
        validate:{isEmail : true},},
        through: "SocietyMembers"
    }
)


eventmodel.belongsToMany(societymodel, {
    sourceKey: 'eventid',
    foreignKey: {
        name :'eventid',
        type: DataTypes.STRING,
        allowNull: false
    }, through: "SocietyEvents"
})
societymodel.belongsToMany(eventmodel,{
    sourceKey: 'societyid',
    foreignKey:{
        name:'societyid',
        type: DataTypes.STRING,
        allowNull: false,
    }, through:"SocietyEvents"
})


usermodel.belongsToMany(eventmodel,{
    sourceKey: 'userEmail',
    foreignKey: {
        name: 'userEmail',
        type: DataTypes.STRING,
        allowNull: false,
        validate:{isEmail : true}
    }, through: "EventMembers"
})
eventmodel.belongsToMany(usermodel, {
    sourceKey: 'eventid',
    foreignKey: {
        name :'eventid',
        type: DataTypes.STRING,
        allowNull: false
    }, through: "EventMembers"
})

