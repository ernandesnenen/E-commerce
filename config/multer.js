
const multer = require('multer')
// o multer serve para upload de arquivos essa função diskStorage 
// é para definir o local de armazenamento das imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname+'/../public/images'),
    filename: (req, file, cb) => cb(null, file.fieldname+'-'+Date.now()+'.jpg'),
})
const upload = multer({storage})
module.exports = upload;
// devo ver as configurações do
// multer pois ainda não tenho dominio
//  sobre ele outra coisa é o tipo de exportação