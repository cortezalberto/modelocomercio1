const { Image, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let images = await Image.findAll();

            meta.length = images.length

            res.status(200).json({ meta, data: images });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let image = await Image.findByPk(id);

            res.status(200).json({ data: image });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { name } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newImage = await Image.create({ name },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newImage });
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

            await Image.update({ name }, { where: { id }, transaction: t });
            
            let updatedImage = await Image.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedImage });
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

            await Image.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
}


module.exports = controller;