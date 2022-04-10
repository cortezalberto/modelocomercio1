const { Order, Detail, History, Shipping, sequelize } = require("../database/models/index");

const controller = {

    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl };

        try {
            let orders = await Order.findAll();

            meta.length = orders.length

            res.status(200).json({ meta, data: orders });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOneById: async (req, res) => {
        let { id } = req.params;
        let include = ['Payment', 'User', 'Shipping', 'State'];

        try {
            let order = await Order.findByPk(id, { include });

            res.status(200).json({ data: order });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getDetailsByOrderId: async (req, res) => {
        let { id } = req.params;
        let includeOrder = ['Payment', 'User', 'Shipping', 'State'];
        let includeDetail = ['Product']
        try {

            //Buscar si existe orden
            let order = await Order.findByPk(id, { include: includeOrder });

            //Buscar detalles del orden
            let details = await Detail.findAll({
                where: { orderId: order.id },
                include: includeDetail
            });

            let data = {
                order,
                details
            }

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getHistoriesByOrderId: async (req, res) => {
        let { id } = req.params;
        let includeHistory = ['State']
        try {

            let histories = await History.findAll({
                where: { orderId: id },
                include: includeHistory
            });

            res.status(200).json({ data: histories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    saveOne: async (req, res) => {
        let { payment, user, shipping, details } = req.body;
        let t;

        try {
            t = await sequelize.transaction();

            //Obtener el ultimo número de orden 
            let lastOrderNumber = await Order.max('number')

            //total de la suma del subtotal multiplicado por la cantidad de los productos
            let totalOrder = details.reduce((acum, b) => acum + b.quantity * b.subtotal, 0)

            //Envio del orden
            let costoEnvio = parseInt(shipping.price)
            let objShipping = {
                street: shipping.street,
                dni: shipping.dni,
                number: shipping.number,
                price: costoEnvio ? costoEnvio : 'Free Shipping', //Envio Gratis
                phoneNumber: shipping.phoneNumber
            }
            let newShipping = await Shipping.create(objShipping, { transaction: t })

            let newOrder = await Order.create({
                number: lastOrderNumber ? lastOrderNumber + 1 : 1, date: new Date(), total: totalOrder, paymentId: payment,
                userId: user, shippingId: newShipping.id, stateId: 1
            }, { transaction: t });

            //recorrer arreglo de detalles 
            let newDetails = details.map((det) => {
                return { quantity: det.quantity, subtotal: det.subtotal, productId: det.product, orderId: newOrder.id }
            })

            await Detail.bulkCreate(newDetails, { transaction: t })

            //Crear historial de orden con estado creado
            await History.create({ date: new Date(), orderId: newOrder.id, stateId: 1 }, { transaction: t })

            t.commit();
            res.status(201).json({ data: newOrder });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },

    updateOneById: async (req, res) => {
        let { number, total, payment,
            user, shipping, state } = req.body;
        let { id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Order.update({
                number, total, paymentId: payment,
                userId: user, shippingId: shipping, stateId: state
            }, { where: { id }, transaction: t });

            let updatedOrder = await Order.findByPk(id);

            t.commit();
            res.status(200).json({ data: updatedOrder });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },

    updateState: async (req, res) => {
        let { state } = req.body;
        let { id } = req.params;
        let include = ['State']
        let t;

        try {
            t = await sequelize.transaction();

            //Buscar historial por id de orden (params) y estado (body)
            let history = await History.findOne({ where: { orderId: id, stateId: state }, include }, { transaction: t })

            //Si no existe el historial se crea
            if (!history) {
                history = await History.create({ date: new Date(), orderId: id, stateId: state }, { transaction: t })
                //res.status(409).json({error: `Ya existe un historial con el id de orden (${id}) y con el id de estado (${history.id})`})
            } else {
                //Si existe se actualiza la fecha del historial
                history.date = new Date()
                await history.save()
            }
            
            await Order.update({ stateId: state }, { where: { id }, transaction: t });

            //Orden Actualizado
            let orderUpdated = await Order.findByPk(id)
            
            //Historial final 
            let finalHistory = history ? history : await History.findOne({ where: { orderId: orderUpdated.id, stateId: state }, include }, { transaction: t })

            let data = {
                order: orderUpdated,
                history: finalHistory
            }

            t.commit();
            res.status(200).json({ data });
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

            await Order.destroy({ where: { id } }, { transaction: t });

            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = controller;