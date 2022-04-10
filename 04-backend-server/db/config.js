const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOCONN);
    console.log('DB connected!');
  } catch (error) {
    console.log(error);
    throw new Error('Error during db connection!');
  }
};

module.exports = {
  dbConnection,
};
