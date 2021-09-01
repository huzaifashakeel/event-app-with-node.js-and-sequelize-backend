
const societyModel = require('../database/models/societies')
const eventModel = require('../database/models/events')


module.exports.addsocietyEventService = async (req, res)=>{
   
    const society = await societyModel.findOne({where:{
        societyid : req.query.societyid
        },
        attributes:['societyid']
    })
    if(!society){
        res.status(403).json({
            success: false,
            messege : 'Event with this id Does not Exist'
        })
    }

    const event = await eventModel.findOne({where:{
        eventid : req.query.eventid
        },
        attributes:['eventid']    
    })
    if(!event){
        res.status(403).json({
            success: false,
            messege : 'Event with this id Does not Exist'
        })
    }

    event.addSocieties(society)
    
    res.status(200).json({
            success: true,
            messege : 'Added Successfully'
        })
}


module.exports.getsocietyEvents = async (req, res)=>{
    const society  = await societyModel.findOne({where: {
        societyid : req.query.societyid
    }})
    if(!society){
        res.status(403).json({
            success: false, 
            messege:'No Society with this id'
        })
    }

   const eventcount =  await society.countEvents() 
   const societyEvents =  await society.getEvents()
   res.status(200).json({
       eventcount: eventcount,
       success: true,
       messege: 'Events Loaded',
       data : societyEvents
   })

}