"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var coingecko_api_v3_1 = require("coingecko-api-v3");
var express = require("express");
var loan_1 = require("./db/loan");
var user_1 = require("./db/user");
var loan_2 = require("./router/loan");
var myPage_1 = require("./router/myPage");
var kas_1 = require("./utils/kas");
var sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');
//require와 import의 혼종..?
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res, next) {
    res.send('hello typescript express!');
});
app.use('/loan', loan_2.loanRouter);
//app.use('/trade', tradeRouter);
app.use('/myPage', myPage_1.myPageRouter);
// app.use('/history', historyRouter);
app.get('/kasTest', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, kas_1.getBlockNumber)()];
            case 1:
                blockNumber = _a.sent();
                console.log(blockNumber);
                res.send(blockNumber);
                return [2 /*return*/];
        }
    });
}); });
app.get('/nftTest', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var contractAddress, ownerAddress, nftArr, _i, nftArr_1, elem, tokenId, tokenURI, projectId, res_1, client, simplePrice, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contractAddress = '0x1b0e9a44a4d7e1fa1e321bb6feadeb3ed6a9843a';
                ownerAddress = '0xBEc3ccA3AbF992Ea770671E568BA8c2C90db271b';
                return [4 /*yield*/, (0, kas_1.getNFT)(contractAddress, ownerAddress)];
            case 1:
                nftArr = _a.sent();
                _i = 0, nftArr_1 = nftArr;
                _a.label = 2;
            case 2:
                if (!(_i < nftArr_1.length)) return [3 /*break*/, 8];
                elem = nftArr_1[_i];
                tokenId = elem.tokenId, tokenURI = elem.tokenURI;
                projectId = 'the-meta-kongz';
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, sdk['retrieving-collection-stats']({ collection_slug: projectId })];
            case 4:
                res_1 = _a.sent();
                client = new coingecko_api_v3_1.CoinGeckoClient({
                    timeout: 10000,
                    autoRetry: true,
                });
                return [4 /*yield*/, client.simplePrice({
                        ids: 'klay-token',
                        vs_currencies: 'eth',
                    })];
            case 5:
                simplePrice = _a.sent();
                console.log(Number(res_1.stats.floor_price));
                console.log(Number(res_1.stats.floor_price) / Number(simplePrice['klay-token'].eth));
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8:
                res.send('success');
                return [2 /*return*/];
        }
    });
}); });
// app.post(
//   '/nftListTest',
//   async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const { CA, name, team } = req.body;
//     const nftList = new nftListModel();
//     nftList.nftCA = CA;
//     nftList.nftName = name;
//     nftList.nftTeam = team;
//     await nftList.save();
//     res.send('succeed');
//   }
// );
app.post('/loanTest', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, duration, amount, interestAmount, tokenId, nftAddress, loanAddress, projectTitle, team, tokenURI, status, loanList;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, duration = _a.duration, amount = _a.amount, interestAmount = _a.interestAmount, tokenId = _a.tokenId, nftAddress = _a.nftAddress, loanAddress = _a.loanAddress, projectTitle = _a.projectTitle, team = _a.team, tokenURI = _a.tokenURI, status = _a.status;
                loanList = new loan_1.Loan();
                loanList.duration = duration;
                loanList.amount = amount;
                loanList.interestAmount = interestAmount;
                loanList.tokenId = tokenId;
                loanList.nftAddress = nftAddress;
                loanList.loanAddress = loanAddress;
                loanList.projectTitle = projectTitle;
                loanList.team = team;
                loanList.tokenURI = tokenURI;
                loanList.status = status;
                return [4 /*yield*/, loanList.save()];
            case 1:
                _b.sent();
                res.send('succeed');
                return [2 /*return*/];
        }
    });
}); });
app.post('/userTest', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                user = new user_1.userModel();
                console.log('test :', id);
                user.userId = id;
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                res.send('succeed');
                return [2 /*return*/];
        }
    });
}); });
app.get('/test', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        user_1.userModel.find({}).then(function (users) {
            console.log(users);
            res.send(users);
        });
        return [2 /*return*/];
    });
}); });
exports.default = app;
