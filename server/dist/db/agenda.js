"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agenda = void 0;
var mongoose = require("mongoose");
var agendaSchema = new mongoose.Schema({
    agendaId: String,
    agendaAddress: String,
    title: String,
    description: String,
}, { timestamps: true });
exports.Agenda = mongoose.model('agenda', agendaSchema);
