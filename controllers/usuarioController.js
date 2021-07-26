const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const enviarEmailRecovery = require('../helpers/email-recovery')
const usuario = require('../models/usuario')

class UsuarioController {

    async index(req, res, next ){
        try {
            
            const usuario = await Usuario.findById(req.payload.id)
            if(!usuario) return res.status(401).json({errors:"usuario não registrado"})
            return res.json({usuario: usuario.enviarAuthJSON()})
        } catch (error) {
          return next  
        }
    }

    async show(req, res, next ){
        try {
            // .populate({path:'loja'})
            const usuario = await Usuario.findById(req.params.id)
            if(!usuario) return res.status(401).json({errors:"usuario não registrado"})
            return res.json({
                nome: usuario.nome,
                email:usuario.email,
                permissao:usuario.permissao,
                loja:usuario.loja
            })
        } catch (error) {
          return next  
        }
    }

    async store(req, res, next ){
        try {
            
            const {nome, email, password} = req.body
            const usuario = new Usuario({nome, email})
            usuario.setSenha(password)

            await usuario.save()
            return res.json({usuario: usuario.enviarAuthJSON()})

           
        } catch (error) {
          return next  
        }
    }

    
    async update(req, res, next ){
        try {
            
            const {nome, email, password} = req.body
            const usuario = await Usuario.findById(req.payload.id)
            if(usuario.nome !== "undefined") usuario.nome = nome;
            if(usuario.email !== "undefined") usuario.email = email;
            if(usuario.password !== "undefined") usuario.setSenha(password);

            await usuario.save()
            return res.json({usuario: usuario.enviarAuthJSON()})

           
        } catch (error) {
          return next  
        }
    }

    async delete(req, res, next ){
        try {
            
            const usuario = await Usuario.findById(req.payload.id)
            if(!usuario) return res.status(401).json({errors:"usuario não registrado"})

            await usuario.remove()
            return res.json({deletado:true})        

           
        } catch (error) {
          return next  
        }
    }

    async login(req, res, next ){
        try {
            const {email, password} = req.body
            if(!email) return res.status(422).json({errors:{email:" não pode ficar vazio"}})
            if(!password) return res.status(422).json({errors:{password:" não pode ficar vazio"}})

            const usuario = await Usuario.findOne({email})
            if(!usuario) return res.status(401).json({errors:"usuario não registrado"})
            if(!usuario.validarSenha(password)) return res.status(401).json({errors:"senha inválida"})

            return res.json({usuario: usuario.enviarAuthJSON()})

           
        } catch (error) {
          return next  
        }
    }




}

module.exports = UsuarioController