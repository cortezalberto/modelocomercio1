const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/categoryCtrl")


const router = Router();

router.get("/categories", getAll);
router.get("/categories/details/:id", getOneById);
router.post("/categories", saveOne);
router.put("/categories/:id", updateOneById);
router.delete("/categories/:id", deleteOneById);



module.exports = router;