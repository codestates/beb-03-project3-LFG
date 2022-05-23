import * as mongoose from 'mongoose';

const pointLogSchema = new mongoose.Schema({
  contractAddress: String,
  userAddress: String,
  point: Number,
});

export const PointLog = mongoose.model('pointLog', pointLogSchema);
