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
exports.getNFT = exports.getBlockNumber = void 0;
var CaverExtKAS = require("caver-js-ext-kas");
var dotenv = require("dotenv");
dotenv.config();
// Cypress : 8217
// Baobab : 1001
var chainId = 1001;
var caver = new CaverExtKAS(chainId, process.env.accessKeyId, process.env.secretAccessKey);
caver.initKASAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);
caver.initTokenHistoryAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);
var getBlockNumber = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, caver.rpc.klay.getBlockNumber()];
            case 1:
                blockNumber = _a.sent();
                return [2 /*return*/, blockNumber];
        }
    });
}); };
exports.getBlockNumber = getBlockNumber;
var getNFT = function (contractAddress, ownerAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var result, arr, _i, _a, elem, tokenId, tokenUri, temp;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, caver.kas.tokenHistory.getNFTListByOwner(contractAddress, ownerAddress)];
            case 1:
                result = _b.sent();
                arr = [];
                for (_i = 0, _a = result.items; _i < _a.length; _i++) {
                    elem = _a[_i];
                    tokenId = elem.tokenId, tokenUri = elem.tokenUri;
                    temp = { tokenId: parseInt(tokenId, 16), tokenUri: tokenUri };
                    arr.push(temp);
                }
                console.log(arr);
                return [2 /*return*/, arr];
        }
    });
}); };
exports.getNFT = getNFT;