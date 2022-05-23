// const mongoose = require('mongoose');

// const pointSchema = new mongoose.Schema(

// const Point = mongoose.model('point', pointSchema);

// module.exports = Point;

// totalScore :
// 5월 emit -> score
// 6월 넘어갈 때
// 함수를 실행시킴
// 한달간 모은 score를 totalScore에 더해주고, score이 0이 되는 과정
// 한달 동안 score

//score -> 기여도 평가
//totalScore -> 이 유저가 얼마나 많이 기여했냐

// score -> 한달간 수수료 누적(한달마다 초기화) -> 기여도를 시즌별로 평가하려고 쓰는 것이고
// totalScore -> 이 사람이 이제까지 시즌별 수수료 누적(한달마다 누적되어서 업데이트) -> 운영진이 특정 유저가 얼마나 기여했는지 언제든 확인할 용도

// collection을 모두 돌아요

// 데이터1, 데이터2, 데이터3,
// 한달
// 1월치 2월치 3월치 4월치 5월치(이번달)
// 유저 ->

// total 데이터

// {userAddress, totalFee}

// totalPoint(총 모은 포인트양, 한달마다 실행)
// point(유저 개인별 한달간 모은 포인트양, 한달마다 )
// pointlog(총 대출 각각의 기여도 포인트 기록)

//eventListener 서버 -> 대출 컨트랙트 완료될시 로그는 로그대로 남기고
//                      기여자는 따로 기록하고
