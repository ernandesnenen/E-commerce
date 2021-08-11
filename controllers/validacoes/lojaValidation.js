const mongoose = require("mongoose")

const Usuario =  mongoose.model("Usuario")
const Loja =  mongoose.model("Loja")

module.exports = async (req,res,next) => {
    try {
        if(!req.payload.id) return res.sendStatus(401)
        const {loja} = req.query
        if(!loja) return res.sendStatus(401)
        const usuario = await Usuario.findById(req.payload.id)
        if(!usuario) return res.sendStatus(401)
        if(!usuario.loja) return res.sendStatus(401)
        if(!usuario.loja !== loja) return res.sendStatus(401)
        if(!usuario.permissao.includes("admin")) return res.sendStatus(401)
        next()
        
    } catch (error) {
        
    }

}