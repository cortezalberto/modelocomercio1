const { Router } = require("express");
const { getAll,getOneById, search, saveOne, updateOneById, deleteOneById } = require("../controllers/productCtrl")


const router = Router();

router.get("/products", getAll);
router.get("/products/details/:id", getOneById);
router.post("/products", saveOne);
router.put("/products/:id", updateOneById);
router.delete("/products/:id", deleteOneById);

router.get("/products/search", search);


module.exports = router;