require("dotenv").config();
const express = require("express");
const Cors = require("cors");

const indexRoutes = require("./routes/index.routes");

const app = express();

//Settings
const port = Number(process.env.PORT);
app.set("port", port);

// Middlewares
app.use(express.json());
app.use( express.urlencoded({extended: false}));
app.use(Cors());


//Routes
app.get("/", (req,res) => res.sendStatus(200) );

for (const route of indexRoutes) {
    app.use("/api/v1", route);
}



module.exports = app;