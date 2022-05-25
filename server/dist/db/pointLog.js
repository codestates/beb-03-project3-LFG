"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLog = void 0;
var mongoose = require("mongoose");
var pointLogSchema = new mongoose.Schema({
    contractAddress: String,
    userAddress: String,
    point: Number,
});
exports.PointLog = mongoose.model('pointLog', pointLogSchema);
