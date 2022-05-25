"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBinit = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
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
        console.log('Connected to database');
    })
        .catch(function (err) {
        console.log("Error connecting to the database : \n".concat(err));
    });
};
exports.DBinit = DBinit;
