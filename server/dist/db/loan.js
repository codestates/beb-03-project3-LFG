"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
var mongoose = require("mongoose");
var loanSchema = new mongoose.Schema({
    debtor: String,
    creditor: String,
    duration: String,
    amount: String,
    interestAmount: String,
    tokenId: String,
    nftAddress: String,
    loanAddress: String,
    projectTitle: String,
    team: String,
    tokenURI: String,
    startTime: String,
    endTime: String,
    paidBackTime: String,
    paidBackAmount: String,
    status: String, // created, canceled, funded, paidBack, defaulted 대문자
}, { timestamps: true });
exports.Loan = mongoose.model('loan', loanSchema);
