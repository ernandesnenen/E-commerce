const router = require("express").Router()
const lojaVavidation = require("../../../controllers/validacoes/lojaValidation")
const auth = require("../../auth");
const LojaController = require("../../../controllers/LojaController")

const lojaController = new LojaController()


router.get("/", lojaController.index) 
router.get("/:id",  lojaController.show)

router.post("/", auth.required, lojaController.store) 
router.put("/:id", auth.required, lojaVavidation, lojaController.update)
router.delete("/:id", auth.required, lojaVavidation, lojaController.remove)



module.exports = router