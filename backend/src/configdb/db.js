require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
    return mongoose.connection.db; // Return the database object
    
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error; // Rethrow the error to be caught in the main index.js file
  }
};
