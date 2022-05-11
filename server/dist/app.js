"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get("/", function (req, res, next) {
    res.send("hello typescript express!");
});
exports.default = app;
