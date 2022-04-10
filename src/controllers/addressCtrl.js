const { Address, sequelize } = require("../database/models/index");

const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let addresses = await Address.findAll();

            meta.length = addresses.length

            res.status(200).json({ meta, data: addresses });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let address = await Address.findByPk(id);

            res.status(200).json({ data: address });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    saveOne: async (req, res) => {
        let { street, number } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newAddress = await Address.create({ street, number },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newAddress });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },

    updateOneById: async (req, res) => {
        let { street, number } = req.body;
        let{ id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Address.update({ street, number }, { where: { id }, transaction: t });
            
            let updatedAddress = await Address.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedAddress });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    
    deleteOneById: async (req, res) => {
        let { id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Address.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = controller;