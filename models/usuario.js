const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const secret = require('../config').secret
const { timeStamp } = require('console')

Schema = mongoose.Schema

const UsuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'não pode ser vazio']
    },
    email:{
        type: String,
        unique: true,
        index: true,
        lowercase:true,
        required: [true, 'não pode ser vazio'],
        match:[/\s+@\s+\.\s/, 'é invalido']
    },
    loja:{
        type: Schema.Types.ObjectId,
        ref:'Loja',
        required: [true, 'não pode ser vazio']
    },
    permissao:{
        type: Array,
        dafault: ['cliente']
    },
    hash: String,
    salt:String,
    recovery:{
        type:{
            token:String,
            date:Date
        },
        default:{}
    }

}, {timeStamp:true})

// #############################################################################################

UsuarioSchema.plugin(uniqueValidator,{message:'já está sendo utilizado'})

UsuarioSchema.methods.setSenha = function(password){
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password,this.salt, 10000,512, "sha512").toString("hex")
}

UsuarioSchema.methods.validarSenha = function(password){
       this.hash = crypto.pbkdf2Sync(password,this.salt, 10000,512, "sha512").toString("hex")
       return hash === this.hash
}

UsuarioSchema.methods.gerarToken = function(){
    const hoje = new Date()
    const exp = new Date(hoje)
    exp.setDate(hoje.getDate()+15)
    
    return jwt.sign({
        id: this._id,
        email: this.email,
        nome: this.nome,
        exp: parseFloat(exp.getTime() /1000, 10)
    })

}
UsuarioSchema.methods.enviarAuthJSON = function(){
       
    return {
       
        nome: this.nome,
        email: this.email,
        loja: this.loja,
        role: this.permissao,
        token: this.gerarToken()
        
    }

}

UsuarioSchema.methods.criarTokenRecuperacaoSenha = function(){
       
   this.recovery = {}
   this.recovery.token = crypto.randomBytes(16).toString("hex")
   this.recovery.date = new Date( new Date().getTime()+ 24*60*60*1000)
    return this.recovery

}

UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function(){
       
    this.recovery = { token: null, date: null}
    return this.recovery
 
 }
 module.exports = mongoose.model('Usuarios', UsuarioSchema)
