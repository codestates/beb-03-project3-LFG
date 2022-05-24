"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointInfo = void 0;
var mongoose = require("mongoose");
var pointInfoSchema = new mongoose.Schema({
    userAddress: String,
    votePoint: Number,
    accPoint: Number, // 시즌별 누적
});
exports.PointInfo = mongoose.model('pointInfo', pointInfoSchema);
