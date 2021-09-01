var Joi = require('joi')
const { DataTypes } = require('sequelize')
const user = require('../database/models/user')
const usersignupmodel = require('../database/models/signup')



module.exports.getcustomorservice = (req, res)=>{
    console.log("finding host")
   user.findOne({where:{
    userEmail : req.query.hostemail
   }}).then(function(host){
       console.log(host)
       res.send(host)
   })
   
}

module.exports.postcustomorService = async (req, res)=>{
    
    var {error} = validateCustomor(req.body)
    if(error){
        return res.status(403).json({
            success: false,
            message: error.details[0].message
        })
    }
    
    console.log(req.body)
    const {name, bio, address, instaid, dateofBirth, userEmail, phoneNumber,
    university, department, registrationNo} = req.body

    await user.create({
        name: name,
        bio: bio,
        address : address,
        instaid: instaid,
        dateofBirth: dateofBirth,
        userEmail: userEmail,
        phoneNumber: phoneNumber,
        university: university,
        department: department,
        registrationNo : registrationNo,
       // profileimage: profileimage
    }).catch((e)=>{
        res.status(403).json({
            success: false,
            message: e,
        })
    })

   const usersign = await usersignupmodel.findOne({where:{email : req.body.userEmail}})
   usersign.update({
    varified: true
   })
   res.status(200).json({
    success: true,
    message: 'Successfully varified'

})    
}
function validateCustomor(user){
    var schema = Joi.object({
        
        name: Joi.string().min(8).required(),
        bio: Joi.string().min(4).required(),
        address: Joi.string().required(),
        instaid: Joi.string().min(10).required(),
        dateofBirth: Joi.string().required(),
        userEmail : Joi.string().required(),
        phoneNumber: Joi.number().integer().min(11).required(),
        university: Joi.string().required(),
        department : Joi.string().required(),
        registrationNo : Joi.string().required()

    })
    return schema.validate(user)
}


module.exports.putCustomorService = (req, res)=>{
    // var customor =  customors.find(c => c.id === parseInt(req.params.id))
    // if(!customor){
    //     return res.send("No customor with this id")
    // }
    // var {error} =validateCustomor(req.body)
    // if(error){
    //     return res.send(error.details[0].message)
    // }
    // customor.name = req.body.name
    // customor.workinghours= req.body.workinghours
    // res.send(customor)
}

module.exports.deleteCustomorService =async (req, res)=>{
   await user.destroy({
       where:{
           userid: req.params.id
       }
   })
}

