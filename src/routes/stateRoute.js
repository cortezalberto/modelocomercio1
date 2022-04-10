const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/stateCtrl")


const router = Router();

router.get("/states", getAll);
router.get("/states/details/:id", getOneById);
router.post("/states", saveOne);
router.put("/states/:id", updateOneById);
router.delete("/states/:id", deleteOneById);



module.exports = router;