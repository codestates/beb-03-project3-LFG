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
exports.getLoan = exports.getLoans = void 0;
var coingecko_api_v3_1 = require("coingecko-api-v3");
var loan_1 = require("../db/loan");
var getLoans = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var loanList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loan_1.Loan.find({}).select('_id debtor creditor state tokenURI tokenId amount rateAmount period projectName')];
            case 1:
                loanList = _a.sent();
                //TODO
                //query parameter filter 구현
                console.log(loanList);
                console.log('getLoans');
                res.status(200).json({ message: 'succeed', loanList: loanList });
                return [2 /*return*/];
        }
    });
}); };
exports.getLoans = getLoans;
var sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');
var getLoan = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var loanInfo, res_1, client, simplePrice, floorPrice, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loan_1.Loan.findOne({ id: req.params.id })];
            case 1:
                loanInfo = _a.sent();
                // const { data } = await axios.get(loan.tokenURI);
                // const loanInfo = data;
                loanInfo.floorPrice = 'N/A';
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, sdk['retrieving-collection-stats']({ collection_slug: loanInfo.projectName })];
            case 3:
                res_1 = _a.sent();
                console.log('res', res_1);
                client = new coingecko_api_v3_1.CoinGeckoClient({
                    timeout: 10000,
                    autoRetry: true,
                });
                return [4 /*yield*/, client.simplePrice({
                        ids: 'klay-token',
                        vs_currencies: 'eth',
                    })];
            case 4:
                simplePrice = _a.sent();
                floorPrice = Number(res_1.stats.floor_price) / Number(simplePrice['klay-token'].eth);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6:
                res.status(200).json({ message: 'succeed', loanInfo: loanInfo });
                return [2 /*return*/];
        }
    });
}); };
exports.getLoan = getLoan;
