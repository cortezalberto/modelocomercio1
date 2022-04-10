const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/sizeCtrl")


const router = Router();

router.get("/sizes", getAll);
router.get("/sizes/details/:id", getOneById);
router.post("/sizes", saveOne);
router.put("/sizes/:id", updateOneById);
router.delete("/sizes/:id", deleteOneById);



module.exports = router;