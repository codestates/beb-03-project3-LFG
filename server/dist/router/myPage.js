"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPageRouter = void 0;
var express = require("express");
var myPageController_1 = require("../controller/myPageController");
var myPageRouter = express.Router();
exports.myPageRouter = myPageRouter;
myPageRouter.post('/', myPageController_1.getWhiteListNFT);
