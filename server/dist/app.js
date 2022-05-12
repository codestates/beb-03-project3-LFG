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
var axios_1 = require("axios");
var express = require("express");
var user_1 = require("./db/user");
var kas_1 = require("./utils/kas");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res, next) {
    // console.log('hello');
    res.send('hello typescript express!');
});
// declare module 'express' {
//   interface Request {
//     body: {
//       id?: String;
//     };
//   }
// }
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
    var contractAddress, ownerAddress, nftArr, _i, nftArr_1, elem, tokenId, tokenUri, uriResult;
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
                if (!(_i < nftArr_1.length)) return [3 /*break*/, 5];
                elem = nftArr_1[_i];
                tokenId = elem.tokenId, tokenUri = elem.tokenUri;
                return [4 /*yield*/, axios_1.default.get(tokenUri)];
            case 3:
                uriResult = _a.sent();
                console.log(uriResult.data);
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                // console.log(blockNumber);
                res.send('success');
                return [2 /*return*/];
        }
    });
}); });
app.post('/test', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
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
