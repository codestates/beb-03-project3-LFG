const mongoose = require('mongoose');

const pointLogSchema = new mongoose.Schema({
  contractAddress: String,
  userAddress: String,
  point: Number,
});

const PointLog = mongoose.model('pointLog', pointLogSchema);

module.exports = PointLog;
