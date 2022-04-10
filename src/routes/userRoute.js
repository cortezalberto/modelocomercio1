const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/userCtrl")

const router = Router();

router.get("/users", getAll);
router.get("/users/details/:id", getOneById);
router.post("/users", saveOne);
router.put("/users/:id", updateOneById);
router.delete("/users/:id", deleteOneById);

module.exports = router;