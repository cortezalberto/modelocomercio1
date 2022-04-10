const { State, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let states = await State.findAll();

            meta.length = states.length

            res.status(200).json({ meta, data: states });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let state = await State.findByPk(id);

            res.status(200).json({ data: state });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { description } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newState = await State.create({ description },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newState });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    updateOneById: async (req, res) => {
        let { description } = req.body;
        let{ id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await State.update({ description }, { where: { id }, transaction: t });

            let updatedState = await State.findByPk(id);

            t.commit();

            res.status(200).json({ data: updatedState });
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

            await State.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({  data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({  error: error.message });
        }
    },
}


module.exports = controller;