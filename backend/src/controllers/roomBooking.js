const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const RoomBooking = require('../models/RoomBooking.js');

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
  
module.exports=router