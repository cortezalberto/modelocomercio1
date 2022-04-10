const { Router } = require("express");
const { getAll, getOneById, saveOne, updateOneById, deleteOneById } = require("../controllers/paymentCtrl")


const router = Router();

router.get("/payments", getAll);
router.get("/payments/details/:id", getOneById);
router.post("/payments", saveOne);
router.put("/payments/:id", updateOneById);
router.delete("/payments/:id", deleteOneById);



module.exports = router;