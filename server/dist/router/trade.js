"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeRouter = void 0;
var express = require("express");
var tradeController_1 = require("../controller/tradeController");
var tradeRouter = express.Router();
exports.tradeRouter = tradeRouter;
tradeRouter.get('/', tradeController_1.getTrades);
