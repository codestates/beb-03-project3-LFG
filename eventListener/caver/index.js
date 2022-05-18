const dotenv = require('dotenv');
dotenv.config();
const CaverExtKas = require('caver-js-ext-kas');

// cypress : 8217, baobab : 1001
const chainId = 1001;
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey
const caver = new CaverExtKas(chainId, accessKeyId, secretAccessKey, { useNodeAPIWithHttp: false });

caver.initTokenHistoryAPI(1001, accessKeyId, secretAccessKey)

module.exports = caver;
