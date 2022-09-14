const mongoose = require('mongoose');

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log('DB is connected!');
};

module.exports = connectDB;
