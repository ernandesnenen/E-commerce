// pacotes

const compression = require('compression')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ejs =require('ejs')
const morgan = require('morgan')

//start

const app = express()

//ambiente
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 30000

// arquivos staticos
app.use("/public", express.static(__dirname+"/public"))
app.use("/public/images", express.static(__dirname+"/public/images"))

// setup do banco de dados
const dbs = require('./config/database.json')
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest
mongoose.connect(dbURI,{useNewUrlParser: true})

//set a engine
app.set('view engine', 'ejs')

if(!isProduction)app.use(morgan("dev"))
app.use(cors())
app.disable('x-powered-by')
app.use(compression())

app.use(bodyParser.urlencoded({extended:false, limit:1.5*1024*1024}))
app.use(bodyParser.json({ limit:1.5*1024*1024}))

require('./models')
app.use('/',require('./routes'))

app.use((req, res, next)=>{
    const err = new Error("Not Foud")
    err.status = 404
    next(err)

})
app.use((err, req, res, next)=>{
    res.status(err.status||500)
    if(err.status !== 404)console.warn("Error: ", err.message, new Date())
    res.json({errors: {erro: err.message, status: err.status}})
})

app.listen(PORT, (err)=>{
    if(err) throw err
    console.log(`servidor rodando na localhost://${PORT}`)

})