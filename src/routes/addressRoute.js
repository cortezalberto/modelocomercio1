const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/addressCtrl")

const router = Router();

router.get("/addresses", getAll);
router.get("/addresses/details/:id", getOneById);
router.post("/addresses", saveOne);
router.put("/addresses/:id", updateOneById);
router.delete("/addresses/:id", deleteOneById);

module.exports = router;