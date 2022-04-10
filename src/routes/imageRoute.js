const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/imageCtrl")


const router = Router();

router.get("/images", getAll);
router.get("/images/details/:id", getOneById);
router.post("/images", saveOne);
router.put("/images/:id", updateOneById);
router.delete("/images/:id", deleteOneById);



module.exports = router;