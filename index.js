var express = require('express')
const {startDatabase,createTable} = require('./database/connection')
startDatabase()
require('./database/association')
createTable()
require('./services/passport')
var app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', require('./routes/index'))



var port = process.env.port || 8000
app.listen(port, ()=>{
    console.log(`listning to port ${port}`)
})