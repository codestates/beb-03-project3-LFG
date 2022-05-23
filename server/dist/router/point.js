"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointRouter = void 0;
var express = require("express");
var pointController_1 = require("../controller/pointController");
var pointRouter = express.Router();
exports.pointRouter = pointRouter;
pointRouter.post('/', pointController_1.userPoint);
