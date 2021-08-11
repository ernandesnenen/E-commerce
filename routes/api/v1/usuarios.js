const router = require("express").Router()
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/usuarioController")

const usuarioController = new UsuarioController()


router.post("/login", usuarioController.login) // testado
router.post("/registrar", usuarioController.store) // testado
router.put("/", auth.required, usuarioController.update)//testado
router.delete("/", auth.required, usuarioController.remove)

router.get("/recuperar-senha", usuarioController.showRecovery) //testado com isominia
router.post("/recuperar-senha", usuarioController.createRecovery) //testado com isominia
router.get("/senha-recuperada", usuarioController.showCompleteRecovery) //testado com isominia
router.post("/senha-recuperada", usuarioController.CompleteRecovery) //testado com isominia

router.get("/", auth.required, usuarioController.index) // testado
router.get("/:id", auth.required, usuarioController.show) //testado
module.exports = router









