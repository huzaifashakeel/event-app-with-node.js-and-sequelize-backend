const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../connection')

class User extends Model{
    

}
User.init(
    {
       
        name: { type : DataTypes.STRING, allowNull : false},
        bio: { type : DataTypes.STRING, allowNull: false, defaultValue: "New User"},
        address:{ type : DataTypes.STRING, allowNull: false},
        instaid:{ type : DataTypes.STRING, allowNull: false },
        userEmail:{type: DataTypes.STRING, unique: true, primaryKey: true, validate:{
            isEmail: true,
        }},
        dateofBirth:{ type: DataTypes.STRING, allowNull: false },
        phoneNumber:{ type: DataTypes.STRING, allowNull: false },
        university:{ type: DataTypes.STRING, allowNull: false, defaultValue: 'UET Taxila'},
        department: { type: DataTypes.STRING, allowNull : false },
        registrationNo: {type: DataTypes.STRING, allowNull: false, unique: true},
  
    },{
        sequelize,
        modelName: "Users"
    }
)


module.exports = User;
