const { Payment, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let payments = await Payment.findAll();

            meta.length = payments.length

            res.status(200).json({ meta, data: payments });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let payment = await Payment.findByPk(id);

            res.status(200).json({ data: payment });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { type } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newPayment = await Payment.create({ type },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newPayment });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    updateOneById: async (req, res) => {
        let { type } = req.body;
        let{ id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Payment.update({ type }, { where: { id }, transaction: t });

            let updatedPayment = await Payment.findByPk(id);

            t.commit();

            res.status(200).json({ data: updatedPayment });
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

            await Payment.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({  data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({  error: error.message });
        }
    },
}


module.exports = controller;