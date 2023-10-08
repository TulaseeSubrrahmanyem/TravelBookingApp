const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const RoomBooking = require('../models/RoomBooking.js');
//const middleware = require('../middlewares/AuthMiddleware.js');
const authMiddleware = require('../middlewares/AuthMiddleware.js');

router.post('/roombookings', async (req, res) => {
    try {
      const roomBookingData = req.body;
      console.log(roomBookingData)
      // Check if required fields are present and have valid values
      if (!roomBookingData.termsAndConditions || !roomBookingData.paymentOption) {
        console.error('Validation failed: agreeToTerms and paymentOption are required fields');
        return res.status(400).json({ error: 'agreeToTerms and paymentOption are required fields' });
      }
  
      // if (!roomBookingData.name || !roomBookingData.city) {
      //   console.error('Validation failed: name and city');
      //   return res.status(400).json({ error: 'Validation failed: name and city' });
      // }
  
      // Create a new RoomBooking document and save it if validation passes
      const newRoomBooking = new RoomBooking(roomBookingData);
      const savedRoomBooking = await newRoomBooking.save();
  
      console.log('Room booking saved:', savedRoomBooking);
      res.status(201).json(savedRoomBooking);
    } catch (error) {
      console.error('Error saving room booking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Assuming you have already imported the necessary modules and set up your Express app

// Define a GET route to retrieve hotel booking details for the currently logged-in user
router.post('/roombookings/user',authMiddleware, async (req, res) => {
  try {
    // Check if the user is authenticated and get their email from the authentication data
    const userEmail = req.user.email; // Replace with your actual way of accessing the user's email
    console.log("userEmail",userEmail)
    // Query the database to find room bookings by the user's email
    const roomBookings = await RoomBooking.find({ email: userEmail });
   console.log("roomBookings Data",roomBookings)
    // Count the number of bookings for the user's email
    const bookingCount = roomBookings.length;
  
    if (bookingCount === 0) {
      return res.status(404).json({ error: 'No bookings found for the logged-in user' });
    }

    // Return the booking details and count
    res.status(200).json({ bookings: roomBookings, bookingCount: bookingCount });
    console.log("RoomBookindDetails Users",roomBookings)
  } catch (error) {
    console.error('Error fetching room bookings for the logged-in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/roombookings/:bookingId', authMiddleware, async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userEmail = req.user.email; // Get the user's email from the authenticated user data
    const bookingId = req.params.bookingId; // Get the booking ID from the URL parameter
    console.log(userEmail,bookingId)
    // Find the room booking by ID and email to ensure the user has access to delete it
    const roomBooking = await RoomBooking.findOne({ _id: bookingId, email: userEmail });

    if (!roomBooking) {
      return res.status(404).json({ error: 'Booking not found or unauthorized' });
    }

    // Delete the room booking
    await RoomBooking.deleteOne({ _id: bookingId });

    res.status(204).send(); // Respond with a 204 No Content status to indicate successful deletion
    console.log('Room booking deleted:', bookingId);
  } catch (error) {
    console.error('Error deleting room booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;

  
