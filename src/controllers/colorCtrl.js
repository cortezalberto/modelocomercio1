const { Color, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let colors = await Color.findAll();

            meta.length = colors.length

            res.status(200).json({ meta, data: colors });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let color = await Color.findByPk(id);

            res.status(200).json({ data: color });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { name } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newColor = await Color.create({ name },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newColor });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    updateOneById: async (req, res) => {
        let { name } = req.body;
        let{ id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Color.update({ name }, { where: { id }, transaction: t });
            
            let updatedColor = await Color.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedColor });
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

            await Color.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
}


module.exports = controller;