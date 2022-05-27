import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import {logger} from "./logger";

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
      // console.log('Connected to database');
      logger.info('Connected to database');
    })
    .catch((err) => {
      logger.error(`Error connecting to the database : \n${err}`);
    });
};
