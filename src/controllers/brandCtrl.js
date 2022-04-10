const { Brand, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let brands = await Brand.findAll();

            meta.length = brands.length

            res.status(200).json({ meta, data: brands });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async (req, res) => {
        
        let { id } = req.params;

        try {
            let brand = await Brand.findByPk(id);

            res.status(200).json({ data: brand });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { name } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newBrand = await Brand.create({ name },{ transaction: t});

            t.commit();

            res.status(201).json({ data: newBrand });
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

            await Brand.update({ name }, { where: { id }, transaction: t });
            let updatedBrand = await Brand.findByPk(id);
            
            t.commit();
            res.status(200).json({ data: updatedBrand });
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

            await Brand.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
}


module.exports = controller;