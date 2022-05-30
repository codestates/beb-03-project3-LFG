"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBinit = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("./logger");
var password = process.env.ATLAS_PASSWORD;
var database_name = process.env.DATABASE_NAME;
var url = "mongodb+srv://mango7loco:".concat(password, "@cluster0.svhee.mongodb.net/").concat(database_name, "?retryWrites=true&w=majority");
var connection_params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
var DBinit = function () {
    mongoose_1.default
        .connect(url, connection_params)
        .then(function () {
        // console.log('Connected to database');
        logger_1.logger.info('Connected to database');
    })
        .catch(function (err) {
        logger_1.logger.error("Error connecting to the database : \n".concat(err));
    });
};
exports.DBinit = DBinit;
