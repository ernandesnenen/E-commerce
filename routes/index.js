const router = require("express").Router()

router.get('/', (req, res, next)=>{ res.send({ok:true})})
router.use('/v1/api', require('./api/v1'))

// ver melho esse miduer depois pois há coisa para entender aqui
router.use((err, req, res, next)=>{
    if(err.name === "ValidationError"){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key)=>{
                errors[key]= err.errors[key.message]
                return errors
            },{})
        })
    }
    return next(err)
})
module.exports = router