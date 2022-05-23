const mongoose = require('mongoose');

const pointInfoSchema = new mongoose.Schema({
  userAddress: String,
  votePoint: Number, // 시즌별 차감
  accPoint: Number, // 시즌별 누적
});

const PointInfo = mongoose.model('pointInfo', pointInfoSchema);

module.exports = PointInfo;
