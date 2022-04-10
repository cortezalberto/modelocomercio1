const { Shipping, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let shippings = await Shipping.findAll();

            meta.length = shippings.length

            res.status(200).json({ meta, data: shippings });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let shipping = await Shipping.findByPk(id);

            res.status(200).json({ data: shipping });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = controller;