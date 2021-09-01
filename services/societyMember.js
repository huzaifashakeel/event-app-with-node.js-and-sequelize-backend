
const societyModel = require('../database/models/societies')
const userModel = require('../database/models/user')


module.exports.addsocietyMemberService = async (req, res)=>{
   
    const society = await societyModel.findOne({where:{
        societyid : req.query.societyid
    }})
    if(!society){
        res.status(403).json({
            success: false,
            messege : 'Event with this id Does not Exist'
        })
    }

    const user = await userModel.findOne({where:{
        userEmail : req.query.userEmail
    }})

    if(!user){
        res.status(403).json({
            success: false,
            messege : 'user Does not Exist'
        })
    }

        const liked = await user.hasSocieties(society)

        if(req.query.check == 'true'){
            res.status(200).json({
                liked: liked,
                messege: 'liked or unliked'
            })
        }
    
        if(req.query.check === 'false'){
            if(liked){
                await user.removeSocieties(society)
                 res.status(200).json({
                     liked: false,
                     messege :'Deleted Successfully'
                 })
            }else{
                await user.addSocieties(society)
                res.status(200).json({
                        liked: true,
                         messege : 'Added Successfully'
                    })
            }   
        }   
}

module.exports.getmemberSocities = async (req, res) =>{

    const user = await userModel.findOne({where:{
        userEmail : req.params.userEmail
    }})

    if(!user){
        res.status(403).json({
            success: false,
            messege : 'user Does not Exist'
        })
    }
    const societycount =  await user.countSocieties();
    
   const memberSocities =  await user.getSocieties();
   res.status(200).json({
       societycount: societycount,
       success: true,
       messege:'Loaded all data',
       data: memberSocities
   })
}

module.exports.getsocietyMembers = async (req, res) =>{

    const society = await societyModel.findOne({where:{
        societyid : req.query.societyid
    }})
    if(!society){
        res.status(403).json({
            success: false,
            messege : 'society with this id Does not Exist'
        })
    }
    const societyMembercount =  await society.countUsers();
    
   const societyMembers =  await society.getUsers();
   res.status(200).json({
       membercount: societyMembercount,
       success: true,
       messege:'Loaded all data',
       data: societyMembers
   })
}