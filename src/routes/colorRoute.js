const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/colorCtrl")


const router = Router();

router.get("/colors", getAll);
router.get("/colors/details/:id", getOneById);
router.post("/colors", saveOne);
router.put("/colors/:id", updateOneById);
router.delete("/colors/:id", deleteOneById);



module.exports = router;