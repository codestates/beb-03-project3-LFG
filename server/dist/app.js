"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var loan_1 = require("./router/loan");
var myPage_1 = require("./router/myPage");
var point_1 = require("./router/point");
var trade_1 = require("./router/trade");
var vote_1 = require("./router/vote");
// import {Api} from 'api';
// const sdk = Api('@opensea/v1.0#5zrwe3ql2r2e6mn');
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
}));
app.get('/', function (req, res, next) {
    res.send('homepage');
});
app.use('/loan', loan_1.loanRouter);
app.use('/trade', trade_1.tradeRouter);
app.use('/myPage', myPage_1.myPageRouter);
app.use('/vote', vote_1.voteRouter);
app.use('/point', point_1.pointRouter);
// app.use('/history', historyRouter);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(404).send({ status: 404, message: 'cannot find website' });
});
exports.default = app;
