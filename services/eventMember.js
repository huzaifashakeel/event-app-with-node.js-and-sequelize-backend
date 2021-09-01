
const eventModel = require('../database/models/events')
const userModel = require('../database/models/user')


module.exports.addorcheckEventMemberService = async (req, res)=>{
   
   
    const event = await eventModel.findOne({
        where:{
        eventid : req.query.eventid
        },
        attributes: ['eventid']
    })
    if(!event){
        res.status(403).json({
            success: false,
            messege : 'Event with this id Does not Exist'
        })
    }

    const user = await userModel.findOne({where:{
        userEmail : req.query.userEmail
        },
        attributes:['userEmail']
    })

    if(!user){
        res.status(403).json({
            success: false,
            messege : 'user Does not Exist'
        })
    }
    
    const liked = await user.hasEvents(event)

    if(req.query.check == 'true'){
        res.status(200).json({
            liked: liked,
            messege: 'liked or unliked'
        })
    }

    if(req.query.check === 'false'){
        if(liked){
            await user.removeEvents(event)
             res.status(200).json({
                 liked: false,
                 messege :'Deleted Successfully'
             })
        }else{
            await user.addEvents(event)
            res.status(200).json({
                    liked: true,
                     messege : 'Added Successfully'
                })
        }   
    }    
}

module.exports.geteventMembers = async (req, res) =>{
    
    console.log(req.query.eventid)
    const event = await eventModel.findOne({where:{
        eventid : req.query.eventid
    }})
    if(!event){
        res.status(403).json({
            success: false,
            messege : 'Event with this id Does not Exist'
        })
    }
    const eventMembercount =  await event.countUsers();
    
   const eventMembers =  await event.getUsers();
   res.status(200).json({
       membercount: eventMembercount,
       success: true,
       messege:'Loaded all data',
       data: eventMembers
   })
}