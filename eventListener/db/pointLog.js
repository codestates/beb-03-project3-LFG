const mongoose = require('mongoose');

const pointLogSchema = new mongoose.Schema({
  contractAddress: String,
  userAddress: String,
  point: Number,
});

const PointLog = mongoose.model('pointLog', pointLogSchema);

module.exports = PointLog;

// {userAddress
// seasonPoint += 각각의 기여도}
// // pointlog(총 대출 각각의 기여도 포인트 기록) -> 해당

// {loan contractAddress,
// userAddress,
// point}

// {loan contractAddress,
// userAddress,
// point}

// //eventListener 서버 -> 대출 컨트랙트 완료될시 로그는 로그대로 남기고
// //                      기여자는 따로 기록하고

// (1,1600)

// a 1~100
// b 101~300
// c 301~700

// 1에서 700 사이의 난수

// 소수점 둘째자리 아니면 셋째자리 하고 * 100
// a : 1.25 id 1 -> 0 ~ 125
// b : 2.33 id 2 -> 125 ~ 125+233
// c : 3.78 id 3 -> 125+233 ~ 125+233+378
// ~~
// z : 3.64 id ~ -> .. ~ value

// total :
