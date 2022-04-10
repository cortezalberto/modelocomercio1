const { Size, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let sizes = await Size.findAll();

            meta.length = sizes.length

            res.status(200).json({ meta, data: sizes });
        } catch (error) {
            
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let size = await Size.findByPk(id);

            res.status(200).json({ data: size });
        } catch (error) {
            
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { name } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newSize = await Size.create({ name },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newSize });
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

            await Size.update({ name }, { where: { id }, transaction: t });
            
            let updatedSize = await Size.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedSize });
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

            await Size.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
}


module.exports = controller;