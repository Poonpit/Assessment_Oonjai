const { Router } = require("express");

class MainRoute {
    router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {}
}

module.exports = MainRoute;
