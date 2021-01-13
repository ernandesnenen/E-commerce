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

