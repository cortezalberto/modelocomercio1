const { User, sequelize } = require("../database/models/index");

const controller = {
    
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let users = await User.findAll();

            meta.length = users.length

            res.status(200).json({ meta, data: users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOneById: async (req, res) => {
        let { id } = req.params;
        let include = ['Role', 'Address'];

        try {
            let user = await User.findByPk(id, { include });

            res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    saveOne: async (req, res) => {
        let { firstName, lastName, addressId, roleId } = req.body;
        let t;

        try {
            t = await sequelize.transaction();
            let newUser = await User.create({ firstName, lastName, addressId, roleId },{ transaction: t});

            t.commit();
            res.status(201).json({ data: newUser });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },

    updateOneById: async (req, res) => {
        let { firstName, lastName, addressId, roleId } = req.body;
        let{ id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await User.update({ firstName, lastName, addressId, roleId }, { where: { id }, transaction: t });
            
            let updatedUser = await User.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedUser });
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

            await User.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = controller;