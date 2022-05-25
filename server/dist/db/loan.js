"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
var mongoose = __importStar(require("mongoose"));
var loanSchema = new mongoose.Schema({
    debtor: String,
    creditor: String,
    period: Number,
    amount: String,
    rateAmount: String,
    tokenId: Number,
    nftAddress: String,
    loanAddress: String,
    projectName: String,
    team: String,
    tokenURI: String,
    startAt: { type: Number, default: null },
    endAt: { type: Number, default: null },
    paidBackTime: { type: Number, default: null },
    paidBackAmount: { type: String, default: null },
    floorPrice: { type: String, default: null },
    state: String, // created, canceled, funded, paidBack, defaulted 대문자 // (status === FUNDED && endTime < nowTime) => 채권자가 아직 담보물을 안 찾아간, 지불기한은 끝난 상태
}, { timestamps: true });
exports.Loan = mongoose.model('loan', loanSchema);
