var joi = require('joi')
const society = require('../database/models/societies')
const user = require('../database/models/user')
const event = require('../database/models/events')


module.exports.postSocietyService = async (req, res)=>{
    console.log(req.body);
 
const {societyid, name, description, university, department,adminEmail, goals, societytype} = req.body    
const myuser = await user.findOne({where:{
    userEmail : adminEmail
}})    
await society.create({
    societyid: societyid,
    name:name,
    description: description,
    university:university,
    department: department,
    adminEmail: adminEmail,
    admin: myuser.name,
    goals: goals,
    societytype: societytype,
   // logo : logo 
}).catch((err)=>{
    res.status(403).json({
        success: false,
        message: "Society with this id already exist",
    })
})
res.status(200).json({
    success: true,
    message: "Society Registred",
})
}


module.exports.getsocietyService = async(req, res)=>{
   const searchedSociety = await society.findOne({where:{
        societyid : req.query.societyid
    },
    attributes:{exclude: ['updatedAt', 'createdAt']}
   })
    if(searchedSociety){
        res.status(200).json({
            success: true,
            message:"Society Found",
            data:[{
                societyid :  searchedSociety.societyid,
                socname : searchedSociety.name,
                description : searchedSociety.description,
                university : searchedSociety.university,
                department : searchedSociety.department,
                adminEmail : searchedSociety.adminEmail,
                creationdate : searchedSociety.creationdate,
                admin : searchedSociety.admin,
                goals : searchedSociety.goals,
                societytype : searchedSociety.societytype,} 
            ]
        })
    }else{
        res.status(403).json({
            success: false,
            message:"Society Not found",
            data:[]
        })
    }
}

module.exports.getMembersocietyService = async (req, res)=>{
    const memberSocities = await society.findAll({
        where:{
            adminEmail : req.params.email
        }
    })
    res.status(200).json({
        success: true,
        message:'Loaded member Socities',
        data: memberSocities
    }) 
}

module.exports.deleteSocietyService= async (req, res)=> {  
    const searchedSociety = await society.findOne({
        where: {
            societyid : req.query.societyid
        },
        attributes:['societyid']
    })
    if(!searchedSociety){
        res.status(400).json({
            success: false,
            message:'No Society with this id',
        })
    }
    await searchedSociety.removeUsers(),
    await searchedSociety.removeEvents(),
    await event.destroy({
        where:{
            societyid : req.query.societyid
        }

    })
    await searchedSociety.destroy()
    
    res.status(200).json({
        success: true,
        message:'Event Deleted Successfully'
    })

}