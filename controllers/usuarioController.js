const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const enviarEmailRecovery = require('../helpers/email-recovery')


class UsuarioController {

    async index(req, res, next ){
        console.log('chegou aqui')
        try {
            
            const usuario = await Usuario.findById(req.payload.id)
            if(!usuario) return res.status(401).json({errors:"usuario não registrado"})
            return res.json({usuario: usuario.enviarAuthJSON()})
        } catch (error) {
            console.log(error)
          return next(error)   
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
            
            const {nome, email, password, loja} = req.body
            const usuario = new Usuario({nome, email, loja})
            usuario.setSenha(password)
             
            await usuario.save()
            
            return res.json({usuario: usuario.enviarAuthJSON()})

           
        } catch (error) {
          
            console.log(error)
            return next(error)
           
        }
    }

    
    async update(req, res, next ){
        try {
            
            const {nome, email, password} = req.body
            const usuario = await Usuario.findById(req.payload.id)
          

            if(typeof nome !== "undefined") usuario.nome = nome;
            if(typeof email !== "undefined") usuario.email = email;
            if(typeof password !== "undefined") usuario.setSenha(password);

            await usuario.save()
            return res.json({usuario: usuario.enviarAuthJSON()})

           
        } catch (error) {
            console.log(error)
          return next(error) 
        }
    }

    async remove(req, res, next ){
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
            console.log(error)
          return next(error)  
        }
    }

    // ***********recovery essa parte trata da recuperação de senha **********************************

    showRecovery(req, res, next){
        return res.render('recovery', {error: null, success: null})
    }

    async createRecovery(req, res, next){
        try {
            const {email} = req.body
            if(!email) return  res.render('recovery', {error: 'preencha com o seu email', success: null})
            const usuario = await Usuario.findOne({email})
            
            if(!usuario) return  res.render('recovery', {error: 'não existe usuário com esse  email', success: null})
            
            const recoveryData =  usuario.criarTokenRecuperacaoSenha() 
            
            await usuario.save()
            console.log('nenen está aqui , ', email)
            enviarEmailRecovery({usuario, recovery: recoveryData}, (error = null, success = null) => {

                return res.render('recovery', {error, success})
            })
                  
        } catch (error) {
            console.log(error)
            return next
        }
    }

    async showCompleteRecovery(req, res, next){
        try {
        if(!req.query.token) return  res.render('recovery', {error: 'Token não indetificado', success: null})
        
        const usuario = await Usuario.findOne({'recovery.token':req.query.token})
      
        if(!usuario) return  res.render('recovery', {error: 'não existe usuário com esse  Token', success: null})
        if(new Date(usuario.recovery.date) < new Date()) return  res.render('recovery', {error: 'Token expirado. tente novamente', success: null})

        // obs: aqui retornamos  a view que nesse caso é recovery/store e não dados
        return res.render('recovery/store', {error: null, success: null, token: req.query.token})
                  
        } catch (error) {
            return next
        }    
    }


    async CompleteRecovery(req, res, next){
        try {
           
        const {token, password} = req.body
        if(!token || !password) return  res.render('recovery/store', {error:'preencha novamente com sua nova senha', success: null, token:token})
        const usuario = await Usuario.findOne({"recovery.token":token})
        console.log(usuario)
        if(!usuario) return  res.render('recovery', {error: 'usuario não indetificado', success: null})
        if(new Date(usuario.recovery.date) < new Date()) return  res.render('recovery', {error: 'Token expirado. tente novamente', success: null})
        
        usuario.finalizarTokenRecuperacaoSenha()
        usuario.setSenha(password)

        await usuario.save()

        // obs: aqui retornamos  a view que nesse caso é recovery/store e não dados
        return res.render('recovery/store', {error: null, success: "senha alterada com sucesso", token: null})
                  
        } catch (error) {
            return next
        }    
    }

}

module.exports = UsuarioController