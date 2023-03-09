import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.middleware()
    }
    
    private middleware() {
        this.express.use(cors())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({extended: false}))
    }
}

export default new App().express