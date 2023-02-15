const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const WaveRoute = require("./wave/route");
const DewRoute = require("./dew/route");
const DinRoute = require("./din/route");
const PanRoute = require("./pan/route");
const PimRoute = require("./pim/routes");
const PoonRoute = require("./poon/route");

class App {
    port;
    app;

    waveRoute;
    dewRoute;
    dinRoute;
    panRoute;
    panRoute;
    pimRoute;
    poonRoute;

    constructor(port) {
        this.port = port;
        this.app = express();

        this.waveRoute = new WaveRoute();
        this.dewRoute = new DewRoute();
        this.dinRoute = new DinRoute();
        this.panRoute = new PanRoute();
        this.pimRoute = new PimRoute();
        this.poonRoute = new PoonRoute();
    }

    setRoutes() {
        // Wave
        this.app.use("/api/wave", this.waveRoute.router);

        // Dew
        this.app.use("/api/dew", this.dewRoute.router);

        // Din
        this.app.use("/api/din", this.dinRoute.router);

        // Pan
        this.app.use("/api/pan", this.panRoute.router);

        // Pim
        this.app.use("/api/pim", this.pimRoute.router);

        // Poon
        this.app.use("/api/poon", this.poonRoute.router);
    }

    setMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server is ready on port ${this.port}`));
    }
}

module.exports = App;
