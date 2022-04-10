const { Router } = require("express");
const { getAll, getOneById } = require("../controllers/shippingCtrl")


const router = Router();

router.get("/shippings", getAll);
router.get("/shippings/details/:id", getOneById);



module.exports = router;