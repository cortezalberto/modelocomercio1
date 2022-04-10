let productRoutes = require("./productRoute");
let brandRoutes = require("./brandRoute");
let categoryRoutes = require("./categoryRoute");
let colorRoutes = require("./colorRoute");
let sizeRoutes = require("./sizeRoute");
let imageRoutes = require("./imageRoute");
let roleRoutes = require("./roleRoute");
let addressRoutes = require("./addressRoute");
let userRoutes = require("./userRoute");
let orderRoutes = require('./orderRoute');
let paymentRoutes = require('./paymentRoute');
let shippingRoutes = require('./shippingRoute');
let stateRoutes = require('./stateRoute');

module.exports = [ 
    productRoutes,
    brandRoutes,
    categoryRoutes,
    colorRoutes,
    sizeRoutes,
    imageRoutes,
    roleRoutes,
    addressRoutes,
    userRoutes,
    orderRoutes,
    paymentRoutes,
    shippingRoutes,
    stateRoutes
]