const mongoose = require('mongoose');

const pointInfoSchema = new mongoose.Schema({
  userAddress: String,
  votePoint: Number,
  accPoint: Number,
});

const PointInfo = mongoose.model('pointInfo', pointInfoSchema);

module.exports = PointInfo;
