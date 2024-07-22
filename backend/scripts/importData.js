const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Data = require('../model/Data');

dotenv.config();

mongoose.connect("mongodb+srv://pavan1413489:<YourPassword>@cluster0.g3xomyl.mongodb.net/black-coffer")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    const jsonData = JSON.parse(fs.readFileSync('../jsondata.json', 'utf-8'));
    await Data.insertMany(jsonData);
    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
