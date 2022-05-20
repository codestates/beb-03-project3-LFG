"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
var mongoose = require("mongoose");
var tradeSchema = new mongoose.Schema({
    tradeId: Number,
    offerAddress: String,
    respondAddress: String,
    offerNFTList: [String],
    respondNFTList: [String],
    offerPaidKlay: String,
    respondPaidKlay: String,
    status: String, // CREATED, CANCELLED, FINISHED
}, { timestamps: true });
exports.Trade = mongoose.model('trade', tradeSchema);
