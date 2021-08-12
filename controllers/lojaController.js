const mongoose = require('mongoose')
const Loja = mongoose.model('Loja')

class lojaController {

    // GET/
    async index(req,res,next){
        try {
           const lojas = await Loja.find({}).select("_id nome cnpj telefones endereco")
           return res.send({lojas})
            
        } catch (error) {
            next(error)
        }
    }

    // GET/:ID
    async show(req,res,next){
        try {
            const loja = await Loja.findById(req.params.id).select("_id nome cnpj telefones endereco")
            return res.send({loja})
            
        } catch (error) {
            next(error)  
        }
    }

    // POST/
    async store(req,res,next){
        try {
            const { nome, cnpj, email, telefones, endereco} = req.body

            const error = []
            if(!nome) error.push("nome")
            if(!cnpj) error.push("cnpj")
            if(!email) error.push("email")
            if(!telefones) error.push("telefones")
            if(!endereco) error.push("endereco")
            if(error.length > 0) return res.status(422).json({error:'required', payload:error})

            const loja = new Loja({ nome, cnpj, email, telefones, endereco})
            await loja.save()
            res.send({loja})



        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
        try {
            const { nome, cnpj, email, telefones, endereco} = req.body
            const loja = await Loja.findById(req.params.id)
            if(!loja) return res.status(422).json({error: 'loja não existe.'})

            if(nome) loja.nome = nome
            if(cnpj) loja.cnpj = cnpj
            if(email) loja.email = email
            if(telefones) loja.telefones = telefones
            if(endereco) loja.endereco = endereco

            await loja.save()
            res.send({loja})
            
        } catch (error) {
            next(error)
        }
    }

    async remove(req,res,next){
        try {
            const loja = await Loja.findById(req.params.id)
            if(!loja) return res.status(422).json({error: 'loja não existe.'})
            res.send({delete:true})

        } catch (error) {
            next(error) 
        }
    }

}

module.exports = lojaController

