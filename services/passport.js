const passport= require('passport')
const passportjwt = require('passport-jwt')
const extractjwt = passportjwt.ExtractJwt;
const Stretegy = passportjwt.Strategy;
const usersignupmodel = require('../database/models/signup')


passport.use(new Stretegy({
    jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt@$#qwy678qwe',
    
    },
    function(jwtpayload, done){   
        return usersignupmodel.findOne({where:{id: jwtpayload.id.id}}).then((user)=>{
            console.log(user)
            return done(null, user)
        }).catch((err)=>{
            console.log('user not found')
            return done(err)
        })
    }
))


