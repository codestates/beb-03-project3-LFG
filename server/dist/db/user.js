"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    userId: String,
});
exports.userModel = mongoose.model('User', userSchema);
