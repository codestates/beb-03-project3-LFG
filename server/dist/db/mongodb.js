"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBinit = void 0;
var dotenv = require("dotenv");
var mongoose = require("mongoose");
dotenv.config();
var password = process.env.ATLAS_PASSWORD;
var database_name = process.env.DATABASE_NAME;
var url = "mongodb+srv://mango7loco:".concat(password, "@cluster0.svhee.mongodb.net/").concat(database_name, "?retryWrites=true&w=majority");
var connection_params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
var DBinit = function () {
    mongoose
        .connect(url, connection_params)
        .then(function () {
        console.log('Connected to database');
    })
        .catch(function (err) {
        console.log("Error connecting to the database : \n".concat(err));
    });
};
exports.DBinit = DBinit;
