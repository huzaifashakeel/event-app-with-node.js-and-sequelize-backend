const Joi = require('joi')
const event = require('../database/models/events')
const {Op} = require('sequelize')
const society = require('../database/models/societies')
const User = require('../database/models/user')

module.exports.getallEvents = async (req, res)=>{
   event.findAll({
    attributes:{exclude: ['updatedAt', 'createdAt']}
   }).then(function(events){
       res.status(200).json({
           itemcount : events.length,
           message: "Loaded All Events",
           data: events
       })
   })
}


module.exports.postEventService =async (req, res)=>{

    await event.create({

        eventid :req.body.eventid,
        name: req.body.name, 
        description: req.body.description, 
        hostemail: req.body.hostemail,
        address: req.body.address,
        admin:req.body.admin,
        hostsocietyname : req.body.hostsocietyname,
        societyid:req.body.societyid,
        intrestcount:0,
        eventDate: req.body.eventDate,
        startingTime: req.body.startingTime,
        endingTime:req.body.endingTime,
        isonline: req.body.isonline,
        totalParticipants: req.body.totalParticipants,

    }).catch((err)=>{
        console.log(err)
        res.status(403).json({
            success: false,
            message:err,
        })
    })

    res.status(200).json({
        success: false,
        message:"Event created successfully",
    })



}

function validateCustomor(event){
console.log("varifying")
    const schema = Joi.object({
        name: Joi.string().min(10).required(), 
        description: Joi.string().min(10).required(), 
    })
    return schema.validate(event)
}

module.exports.deleteEventService= async (req, res)=> {
   
    const searchedevent = await event.findOne({
        where: {
            eventid : req.query.eventid
        }, 
        attributes:['eventid']
    })
    if(!searchedevent){
        res.status(400).json({
            success: false,
            message:'No Event with this id',
        })
    }
    await searchedevent.removeUsers(),
    await searchedevent.removeSocieties(),
    await searchedevent.destroy()

    res.status(200).json({
        success: true,
        message:'Event Deleted Successfully'
    })

}