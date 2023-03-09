"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require('pino');
const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
});
exports.default = logger;
