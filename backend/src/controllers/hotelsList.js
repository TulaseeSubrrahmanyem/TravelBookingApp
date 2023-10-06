const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// Import the database connection function
const connectToDatabase = require("../configdb/db");

// Route to search hotels by location (city)
router.get('/search', async (req, res, next) => {
  try {
    const { city, checkIn, checkOut, adults, children, rooms} = req.query;

    // Check if required parameters are present
    if (!city || !checkIn || !checkOut || !adults || !rooms) {
      return res.status(400).json({ message: 'Invalid request. Please provide all required parameters.' });
    }

    // Convert adults, children, and rooms to numbers
    const adultsCount = parseInt(adults, 10);
    const childrenCount = parseInt(children, 10);
    const roomsCount = parseInt(rooms, 10);

    // Check if the parsed numbers are valid
    if (isNaN(adultsCount) || isNaN(childrenCount) || isNaN(roomsCount)) {
      return res.status(400).json({ message: 'Invalid parameter values. Please provide valid numbers for adults, children, and rooms.' });
    }

    // Connect to the database
    const db = await connectToDatabase();

    if (!db) {
      return res.status(500).json({ message: 'Database connection error' });
    }

    const collection = db.collection('hotelBooking');

       
      // If a city is provided, search by city
    let  query = { city: { $regex: city, $options: 'i' } };
   

    // Aggregation to join hotelBooking with hotelPhotos
    const hotelsWithImages = await collection.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'hotelPhotos',
          localField: 'name',
          foreignField: 'hotel_name',
          as: 'images',
        },
      },
      {
        $lookup: {
          from: 'hotelRating',
          localField: 'name',
          foreignField: 'name',
          as: 'rating',
        },
      },
      {
        $lookup: {
          from: 'hotelRoomTypesAndPrices',
          localField: 'name',
          foreignField: 'name',
          as: 'prices',
        },
      },
    ]).toArray();

    if (hotelsWithImages.length === 0) {
      console.log(res.status(404).json({ message: `No hotels available for the city: ${city || 'No city specified'}.` }))
      return res.status(404).json({ message: `No hotels available for the city: ${city || 'No city specified'}.` });
     
    }

    // Check room availability for each hotel
    for (const hotel of hotelsWithImages) {
      const roomsAvailableData = await collection.aggregate([
        {
          $match: {
            name: hotel.name,
            'rooms.checkInDate': { $lte: new Date(checkOut) },
            'rooms.checkOutDate': { $gte: new Date(checkIn) }
          }
        },
        {
          $group: {
            _id: null,
            bookedRooms: { $sum: 1 }
          }
        }
      ]).toArray();

      let bookedRooms = 0;

      if (roomsAvailableData.length > 0) {
        bookedRooms = roomsAvailableData[0].bookedRooms;
      }

      hotel.number_of_rooms_available = hotel.number_of_rooms - bookedRooms;
    }

    // Return the responseho
    console.log(hotelsWithImages)
    res.json(hotelsWithImages);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Route to search hotels by location (city)
router.get('/roomsDetails', async (req, res, next) => {
  try {
    const { hotelName } = req.query;
    if (!hotelName) {
      return res.status(400).json({ message: 'Invalid request. Please provide a hotelId.' });
    }
    // Connect to the database
    const db = await connectToDatabase();

    if (!db) {
      return res.status(500).json({ message: 'Database connection error' });
    }

    const collection = db.collection('hotelBooking');

  
    let query ={ name: hotelName };

    

    // Aggregation to join hotelBooking with hotelPhotos
    const hotelsWithImages = await collection.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'hotelPhotos',
          localField: 'name',//this  is first collection to match
          foreignField: 'hotel_name',//this  is second collection to match
          as: 'images',
        },
      },
      {
        $lookup: {
          from: 'hotelRating', // Join with the hotelRating collection
          localField: 'name',
          foreignField: 'name',
          as: 'rating', // Store the rating details in the 'rating' field
        },
      },
      {
        $lookup: {
          from: 'hotelRoomTypesAndPrices', // Join with the hotelRoomtype Prices collection
          localField: 'name',
          foreignField:'name',
          as: 'prices', // Store the price details in the 'prices' field
        },
      },
     
    ]).toArray();

    if (hotelsWithImages.length === 0) {
      return res.status(404).json({ message: `No hotels available for the city: ${city || 'No city specified'}.` });
    }

    res.json(hotelsWithImages);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});
module.exports = router;
