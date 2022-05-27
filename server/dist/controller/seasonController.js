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
exports.seasonVote = exports.viewSeason = exports.seasonList = void 0;
var pointInfo_1 = require("../db/pointInfo");
var season_1 = require("../db/season");
var seasonList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var list, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, season_1.Season.find({}).select('_id title')];
            case 1:
                list = _a.sent();
                res.status(200).json({ message: 'succeed', list: list });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.seasonList = seasonList;
var viewSeason = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, season, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, season_1.Season.findOne({ _id: id })];
            case 1:
                season = _a.sent();
                if (season === null) {
                    next();
                }
                res.status(200).json({ message: 'succeed', season: season });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.viewSeason = viewSeason;
var seasonVote = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_1, _a, userAddress, nftAddress_1, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id_1 = req.params.id;
                _a = req.body, userAddress = _a.userAddress, nftAddress_1 = _a.nftAddress;
                return [4 /*yield*/, pointInfo_1.PointInfo.findOne({ userAddress: userAddress.toLowerCase() }).then(function (info) { return __awaiter(void 0, void 0, void 0, function () {
                        var votePoint_1, infoRes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(info === null)) return [3 /*break*/, 1];
                                    res.status(400).json({ message: 'fail, you have no votePoint' });
                                    return [3 /*break*/, 4];
                                case 1:
                                    votePoint_1 = info.votePoint;
                                    info.votePoint = 0;
                                    return [4 /*yield*/, info.save()];
                                case 2:
                                    infoRes = _a.sent();
                                    if (infoRes === null) {
                                        next();
                                    }
                                    return [4 /*yield*/, season_1.Season.findOne({ _id: id_1 }).then(function (season) { return __awaiter(void 0, void 0, void 0, function () {
                                            var _i, _a, elem, seasonRes;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        for (_i = 0, _a = season.candidate; _i < _a.length; _i++) {
                                                            elem = _a[_i];
                                                            if (elem.nftAddress.toLowerCase() === nftAddress_1.toLowerCase()) {
                                                                elem.vote += votePoint_1;
                                                                break;
                                                            }
                                                        }
                                                        return [4 /*yield*/, season.save()];
                                                    case 1:
                                                        seasonRes = _b.sent();
                                                        if (seasonRes === null) {
                                                            next();
                                                        }
                                                        res.status(200).json({ message: 'succeed', season: season });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.seasonVote = seasonVote;
