const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../connection')

class SignUp extends Model{
    

}
SignUp.init(
    {
       
        username: { type : DataTypes.STRING, allowNull : false, unique: true},
        email:{ type: DataTypes.STRING, allowNull: false, unique : true,validate:{
            isEmail: true
        } },
        password:{ type : DataTypes.STRING, allowNull:false,},
        varified:{type: DataTypes.BOOLEAN, defaultValue:false}
    },{
        sequelize,
        modelName: "UserSignUps"
    }
)

module.exports = SignUp;
