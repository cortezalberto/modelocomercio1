const { Router } = require("express");
const { getAll,getOneById, saveOne, updateOneById, deleteOneById, getDetailsByOrderId, getHistoriesByOrderId, updateState } = require("../controllers/orderCtrl")


const router = Router();

router.get("/orders", getAll);
router.get("/orders/:id", getOneById);
router.get("/orders/details/:id", getDetailsByOrderId)
router.get("/orders/history/:id", getHistoriesByOrderId)
router.post("/orders", saveOne);
router.put("/orders/:id", updateOneById);
router.put("/orders/state/:id", updateState);
router.delete("/orders/:id", deleteOneById);


module.exports = router;