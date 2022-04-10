const { Role, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let roles = await Role.findAll();

            meta.length = roles.length

            res.status(200).json({ meta, data: roles });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    getOneById: async (req, res) => {
        let { id } = req.params;

        try {
            let role = await Role.findByPk(id);

            res.status(200).json({ data: role });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    saveOne: async (req, res) => {
        let { name } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newRole = await Role.create({ name },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newRole });
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

            await Role.update({ street, number }, { where: { id }, transaction: t });
            
            let updatedRole = await Role.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedRole });
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

            await Role.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = controller;