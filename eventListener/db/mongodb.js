const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const password = process.env.ATLAS_PASSWORD;
const database_name = process.env.DATABASE_NAME;
const url = `mongodb+srv://mango7loco:${password}@cluster0.svhee.mongodb.net/${database_name}?retryWrites=true&w=majority`;

const connection_params = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DBinit = () => {
  mongoose
    .connect(url, connection_params)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Error connecting to the database : \n${err}`);
    });
};

exports.DBinit = DBinit