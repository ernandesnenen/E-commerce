const  transporter = require('nodemailer').createTransport(require('../config/email'))
const { api: link} = require('../config/index')

module.exports = ({usuario, recovery}, cb) => {
   
    const message = ` 
    <h1>Recuperação de senha </h1>
    <br />
    <p>aqui esta o link para redefinir sua senha. Acesse e digitensua nova senha</p>
    <a href=" ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}">
        ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
    </a>
    <p>atenciosamente loja de TI</p>
      
    `

    const opcoesEmail = {
        from:'naorespondera@lojaTi.com',
        to: usuario.email,
        subject:'redefiniçõa de senha',
        text: "link de recuperação de senha enviado co sucesso", 
        html: message
    }

    if(process.env.NODE_ENV === 'production'){
       transporter.sendMail(opcoesEmail, (error, info)=> {
        if(error){
            console.log(error)
            return cb(' A contecue um error n envio do  email, tente novamente ')
        }else{
            return cb(null,'link de recuperação de senha enviado co sucesso')
        }
       })
    }else{
        transporter.sendMail(opcoesEmail, (error, info)=> {
            if(error){
                console.log(error)
                return cb(' A contecue um error n envio do  email, tente novamente ')
            }else{
                return cb(null,'link de recuperação de senha enviado co sucesso')
            }
           })
    }

}