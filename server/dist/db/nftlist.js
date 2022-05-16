"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftListModel = void 0;
var mongoose = require("mongoose");
var nftListSchema = new mongoose.Schema({
    nftCA: String,
    nftName: String,
    nftTeam: String,
});
exports.nftListModel = mongoose.model('NFTList', nftListSchema);
