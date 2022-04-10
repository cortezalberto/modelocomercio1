const { Category, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let categories = await Category.findAll();

            meta.length = categories.length

            res.status(200).json({ meta, data: categories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let category = await Category.findByPk(id);

            res.status(200).json({ data: category });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { name } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newCategory = await Category.create({ name },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newCategory });
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

            await Category.update({ name }, { where: { id }, transaction: t });

            let updatedCategory = await Category.findByPk(id);

            t.commit();

            res.status(200).json({ data: updatedCategory });
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

            await Category.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({  data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({  error: error.message });
        }
    },
}


module.exports = controller;