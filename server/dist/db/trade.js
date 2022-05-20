"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
var mongoose = require("mongoose");
var NFTSchema = new mongoose.Schema({
    tokenURI: String,
    tokenId: Number,
    nftAddress: String,
    team: String,
    projectName: String,
}, { _id: false });
var tradeSchema = new mongoose.Schema({
    tradeId: Number,
    offerAddress: String,
    respondAddress: String,
    offerNFTList: [NFTSchema],
    respondNFTList: [NFTSchema],
    offerPaidKlay: String,
    respondPaidKlay: String,
    status: String, // CREATED, CANCELLED, FINISHED
}, { timestamps: true });
exports.Trade = mongoose.model('trade', tradeSchema);
