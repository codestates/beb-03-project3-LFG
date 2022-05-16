"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyRouter = void 0;
var express = require("express");
var historyController_1 = require("../controller/historyController");
var historyRouter = express.Router();
exports.historyRouter = historyRouter;
historyRouter.get('/', historyController_1.getHistory);
