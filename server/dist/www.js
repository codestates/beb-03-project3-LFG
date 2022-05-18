"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var app_1 = require("./app");
var mongodb_1 = require("./db/mongodb");
var port = Number(process.env.PORT) || 4002;
var server = (0, http_1.createServer)(app_1.default);
server.listen(port, function () {
    (0, mongodb_1.DBinit)();
    console.log("".concat(port, "\uD3EC\uD2B8 \uC11C\uBC84 \uB300\uAE30 \uC911!"));
});
exports.default = server;
