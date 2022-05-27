"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var http_1 = require("http");
var app_1 = __importDefault(require("./app"));
var connect_1 = require("./utils/connect");
var logger_1 = require("./utils/logger");
var port = Number(process.env.PORT) || 4002;
var server = (0, http_1.createServer)(app_1.default);
server.listen(port, function () {
    (0, connect_1.DBinit)();
    logger_1.logger.info("".concat(port, " \uD3EC\uD2B8 \uC11C\uBC84 \uB300\uAE30 \uC911!"));
});
exports.default = server;
