import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
});

export const userModel = mongoose.model('User', userSchema);
