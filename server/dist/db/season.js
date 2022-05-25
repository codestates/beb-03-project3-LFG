"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
var mongoose = require("mongoose");
var seasonSchema = new mongoose.Schema({
    title: String,
    description: String,
    candidate: [
        {
            nftAddress: String,
            image: String,
            projectName: String,
            vote: Number,
        },
    ],
});
exports.Season = mongoose.model('season', seasonSchema);
