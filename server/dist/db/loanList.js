"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanListModel = void 0;
var mongoose = require("mongoose");
var loanListSchema = new mongoose.Schema({
    duration: Number,
    amount: Number,
    interestAmount: Number,
    tokenId: Number,
    nftAddress: String,
    loanAddress: String,
    projectTitle: String,
    team: String,
    tokenURI: String,
    status: String,
}, { timestamps: true });
exports.loanListModel = mongoose.model('loanList', loanListSchema);
