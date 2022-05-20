"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
var mongoose = require("mongoose");
var tradeSchema = new mongoose.Schema({
    tradeId: Number,
    offerAddress: String,
    respondAddress: String,
    offerNFTList: [
        {
            nftAddress: String,
            tokenId: String,
            tokenURI: String,
        },
    ],
    respondNFTList: [
        {
            nftAddress: String,
            tokenId: String,
            tokenURI: String,
        },
    ],
    offerPaidKlay: Number,
    respondPaidKlay: Number,
    status: String, // CREATED, CANCELLED, FINISHED
}, { timestamps: true });
exports.Trade = mongoose.model('trade', tradeSchema);
