"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var loan_1 = require("./router/loan");
var myPage_1 = require("./router/myPage");
var point_1 = require("./router/point");
var trade_1 = require("./router/trade");
var vote_1 = require("./router/vote");
var sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
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
