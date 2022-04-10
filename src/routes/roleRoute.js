const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/roleCtrl")

const router = Router();

router.get("/roles", getAll);
router.get("/roles/details/:id", getOneById);
router.post("/roles", saveOne);
router.put("/roles/:id", updateOneById);
router.delete("/roles/:id", deleteOneById);

module.exports = router;