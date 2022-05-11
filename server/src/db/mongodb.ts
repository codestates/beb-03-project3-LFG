import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
dotenv.config();

const password = process.env.ATLAS_PASSWORD;
const database_name = process.env.DATABASE_NAME;
const url = `mongodb+srv://mango7loco:${password}@cluster0.svhee.mongodb.net/${database_name}?retryWrites=true&w=majority`;

const connection_params: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const DBinit = () => {
  mongoose
    .connect(url, connection_params)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log(`Error connecting to the database : \n${err}`);
    });
};

// module.exports = {
//   DBinit,
// };
