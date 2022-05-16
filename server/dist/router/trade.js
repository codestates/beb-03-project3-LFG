"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeRouter = void 0;
var express = require("express");
var loanController_1 = require("../controller/loanController");
var tradeRouter = express.Router();
exports.tradeRouter = tradeRouter;
tradeRouter.get('/', loanController_1.getLoans);
