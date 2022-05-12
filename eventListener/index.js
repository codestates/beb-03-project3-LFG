const dotenv = require('dotenv');
const CaverExtKas = require('caver-js-ext-kas');
const websocketProvider = new CaverExtKas.providers.WebsocketProvider('ws://localhost:8545');
const caver = new CaverExtKas(websocketProvider);

const greetabi = require('./config/greet.json');

dotenv.config();
const chainId = 1001
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey

caver.initNodeAPI(chainId, accessKeyId, secretAccessKey, false);
console.log('hello')

const addr = "0xC01978d4AfFeA0e6876356e110C05D963914A350";
const contract = new caver.contract(greetabi, addr);
contract.events.allEvents((err, res)=>{
    console.log(res);
});
