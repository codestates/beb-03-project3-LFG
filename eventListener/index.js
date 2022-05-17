const dotenv = require('dotenv');
dotenv.config();
const { DBinit } = require('./db/mongodb');
const loanFactoryAbi = require("./config/LoanFactory.json");
const LOANFACTORY_ADDRESS = "0xd7D7b53aEB978E96d7C506946cF69393ABB9ffF3"

DBinit();

const CaverExtKas = require('caver-js-ext-kas');

// cypress : 8217, baobab : 1001
const chainId = 1001;
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey
const caver = new CaverExtKas(chainId, accessKeyId, secretAccessKey, { useNodeAPIWithHttp: false });

const greetabi = require('./config/greet.json');
const addr = "0x21F3CE8FFc4af7d9Dd9F22E9cCfe3cd11c0d2977";
const contract = new caver.contract(greetabi, addr);

setInterval(async () => {
    try{
        const blockNumber = await caver.rpc.klay.getBlockNumber()
        console.log(blockNumber);
    }catch(e){
        console.log(e);
    }
}, 10000);

const subscrpition = caver.rpc.klay.subscribe('logs', {},(err, res) => {

    const deployTopic = '0x55ea6c6b31543d8e2ec6a72f71a79c0f4b72ed0d4757172b043d8f4f4cd84848'
    const cancelTopic = '0x4aa8e773783771612c47fa512db50b9316d0863fd83c45829adfe92833d7d68b';
    const editTopic = '0xeba4354c89dbb1beecd85003358b97b9e36c15303c38a0645723814121e844c9';
    const fundTopic = '0xda8220a878ff7a89474ccffdaa31ea1ed1ffbb0207d5051afccc4fbaf81f9bcd';
    const repayTopic = '0x552544cb36551120f07c66c5cd4b2987725a0c72198587f2ce796099bb66c58c';
    const defaultTopic = '0x46b9cd4891c2c9c48ba40bb38b2058575e06ecdaab42ec43bcb2574c4be226be';

    if(err){
        console.log(err);
        return;
    }
    if (res.topics[0] === deployTopic){
        // res.data // 만들어진 loan contract 주소
        //0x0000000000000000000000003184eeb27561d6131f201c3ccac9147ed72b3caf
        console.log(res);
        console.log('0x' + res.data.slice(-40));
    }
    if (res.topics[0] === cancelTopic){
        //res.address
        //res.data : period, 금액, 금액, 이자금액
        console.log(res); // address가 loan contract를 의미하므로, 이 주소를 이용해서 db 업데이트하기
    }
    if (res.topics[0] === editTopic){
        //res.data : period, 금액, 금액, 이자금액
        console.log(res);
    }
    if (res.topics[0] === fundTopic){
        //res.data : msg.sender(채권자), created_at 생성된 인자  
        console.log(res);
    }

    if (res.topics[0] === repayTopic){
        console.log(res);
    }

    if (res.topics[0] === defaultTopic){
        console.log(res);
    }
    // if (res.address === '0xcfc328482144862cde46b9df7a54c1719162526f'){
    //     console.log(res);
    // }
})







    //     //addressList.push(res.address);
    //     console.log('case1');
    //     console.log(res);
    // }
    // if (res.address === addr.toLowerCase()){
    //     console.log('======================================================');
    //     console.log(res);
    //     console.log('=====================================================')
    // }