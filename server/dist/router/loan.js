"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRouter = void 0;
var express = require("express");
var loanController_1 = require("../controller/loanController");
var loanRouter = express.Router();
exports.loanRouter = loanRouter;
loanRouter.get('/', loanController_1.getLoans);
