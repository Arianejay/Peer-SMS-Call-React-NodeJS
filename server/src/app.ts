import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import SMSRoutes from "./routes/sms.route";
import CallRoutes from "./routes/call.route";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes() {
        this.express.use("/sms", SMSRoutes);
        this.express.use("/call", CallRoutes);
    }

    // async start() {
    //     this.express.use.middleware();
    // }
}

export default new App().express;
