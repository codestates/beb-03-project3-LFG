"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose = require("mongoose");
var nftListSchema = new mongoose.Schema({
    nftCA: String,
    nftName: String,
    nftTeam: String,
});
exports.userModel = mongoose.model('NFTList', nftListSchema);
