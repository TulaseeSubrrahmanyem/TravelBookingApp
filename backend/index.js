// eslint-disable-next-line no-undef
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const path=require('path')
// Import the database connection function
const connectToDatabase = require("./src/configdb/db");
const hotelRoutes = require('./src/controllers/hotelsList');
const roomBooking = require('./src/controllers/roomBooking');
const userRoutes = require('./src/controllers/userAuthentication');

// Middleware for handling database errors
const handleDatabaseError = (err, req, res, next) => {
  console.error("Database Error:", err.message);
  res.status(500).json({
    error: "Database error",
    errorMessage: err.message,
    lineNumber: err.lineNumber,
    stackTrace: err.stack,
  });
};
// const corsOptions = {
//   origin: 'https://flourishing-sunflower-a236f2.netlify.app', // Replace with your Netlify frontend domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };


// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    // app.use(express.static(path.join(__dirname,'./client/build')))
    // app.get('*',function(req,res){
    //   res.sendFile(path.join(__dirname,'./client/build/index.html'))
    // });
     // Set up other middlewares and routes here
     app.use(cors()); // Enable CORS for all routes
    //  app.use(cors(corsOptions));
     app.use(express.json());
    
     // Use the hotel routes
    app.use('/api/hotels', hotelRoutes);
   
     // Use the roomBooking routes
     app.use('/api', roomBooking);
     app.use('/api/users', userRoutes);
     // Error handling middleware for database errors
     app.use(handleDatabaseError);

     // Error handling middleware for server errors
     app.use((err, req, res, next) => {
       console.error("Server Error:", err.stack);
       res.status(500).json({ error: "Internal server error" });
     });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Handle database connection error
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process on database connection error
  });
