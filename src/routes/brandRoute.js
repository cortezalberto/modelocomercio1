const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/brandCtrl")


const router = Router();

router.get("/brands", getAll);
router.get("/brands/details/:id", getOneById);
router.post("/brands", saveOne);
router.put("/brands/:id", updateOneById);
router.delete("/brands/:id", deleteOneById);



module.exports = router;