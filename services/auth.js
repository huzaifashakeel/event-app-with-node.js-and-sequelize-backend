const {Op} = require('sequelize')
const jwt = require('jsonwebtoken')

const signupservices =  require('../database/models/signup')
const {passwordHash, varifyPassword} = require('../utils/utils')






module.exports.postuserService = async (req, res) =>{
    const {username, email, password} = req.body
    const alreadyexistuser = await signupservices.findOne({where:{[Op.or]:{
        username : username, 
        email : email
    }}})
    if(alreadyexistuser){
        
        return res.status(401).json({message: 'User already exist'})
    }

    const newuser = new signupservices({username, email, password: passwordHash(password)})
    const saveuser = await newuser.save().catch((err)=>{
        res.status(500).json({message:'cannot save at the moment'})
    })

    if(saveuser){
        res.status(200).json({message:'User Registred Successfully'})
    }  
}




module.exports.getuserService = async (req, res)=>{
   const user =  await signupservices.findOne({
        where:{
            [Op.or]:{
                username : req.query.username,
                email: req.query.username
        }
    } 
    });
    if(user){
        console.log(user)
      if(varifyPassword({
           inputpassword: req.query.password,
           passwordhashfromdb : user.password
       })){
           console.log("password matched")
        const jsonwebtoken =await jwt.sign({id: user, email: user.email}, 'jwt@$#qwy678qwe',{
            expiresIn: '24h'
        })
        res.status(200).json({
            success : true,
            message:'Successfully Logged in',
            data:[{
                username : user.username,
                email : user.email,
                isvarified: user.varified,
                token: 'Bearer '+ jsonwebtoken
            }
            ] 
            })
            
           console.log(res.status)
       }
       else {
           console.log(res.status)
        res.status(400).json({
          success: false,
          message: 'username or Password is incorrect',
          data:[]
        });
      }
    }
    else {
        console.log(res.status)
        res.status(400).json({
          success: false,
          message: 'username or Password is incorrect',
          data:[]
        });
      }
}