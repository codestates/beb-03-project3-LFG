"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftList = void 0;
var mongoose = require("mongoose");
var nftListSchema = new mongoose.Schema({
    nftAddress: String,
    projectName: String,
    team: String,
});
exports.NftList = mongoose.model('NFTList', nftListSchema);
