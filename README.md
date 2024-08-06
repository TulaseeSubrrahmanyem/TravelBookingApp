Travel Booking Application - Project Documentation
Table of Contents

1 Project Overview
2 Frontend Features
   User Authentication
    Hotel Search
    Hotel Listings
    Sorting Options
    Room Details
    Booking Functionality
    User Dashboard
    User Profile Management
    Logout Functionality

3 Backend Features
    API Request Handling
    MongoDB Integration
    User Authentication
    Booking Management
    User Profile Management
    Endpoint Provision    

4 Technologies Used
5 Setup Instructions
6 Usage
7 Contributing
8 License    

Project Overview
The Travel Booking Application is a comprehensive platform designed to simplify the hotel booking process for users. It enables users to search and book hotels based on their travel requirements, such as the desired city, check-in and check-out dates, and the number of rooms and guests. The application offers a seamless and user-friendly experience for finding and booking hotels, with a range of features to enhance user convenience.

Frontend Features
User Authentication
   1 Utilizes Google OAuth for secure user authentication.
    2Users can log in or sign up using their Google accounts, ensuring a hassle-free and secure sign-in process.
    
Hotel Search
     1 Users can search for hotels based on various criteria, including location, check-in and check-out dates, and the number of rooms and guests.
    2 The search functionality is user-friendly and provides a convenient way to find the perfect accommodation.

Hotel Listings

  1 Displays a list of available hotels based on the search criteria.
  2 Users can easily browse through the listings and choose the one that suits their preferences.

Sorting Options

  1 Users have the option to sort hotel listings by price, either from low to high or high to low.
  2 Users can also sort by ratings to find hotels with the highest ratings.


Room Details

  1 Provides detailed information about each hotel room, including room prices, room features, photos, and location on the map.
  2 Helps users make informed decisions when booking a room.

Booking Functionality

  1 Users can initiate the booking process with a simple click of the "Book" button.
  2 The application guides users through the booking process, making it convenient to confirm their stay.

User Dashboard
  1 Provides users with essential information, such as the number of bookings made and canceled.
  2 Displays booking history, including check-in and check-out dates.

User Profile Management

  1 Allows users to manage their profiles, including updating personal details such as country name and email address.
  2  Users can also add names of fellow travelers.
  
Logout Functionality

  1 Users can log out of their accounts securely, ensuring their data is protected.


Backend Features

API Request Handling

  Handles API requests from the frontend.
  Manages data retrieval, user authentication, and booking processing.
  
MongoDB Integration
  Integrated with a MongoDB cluster to store and retrieve data, including hotel and user information.
  Uses MongoDB for efficient data management.
  
User Authentication

  Implements user authentication using Google OAuth and JSON Web Tokens (JWT).
  Ensures secure user access to the application.
  
Booking Management

  Manages user bookings and cancellations.
  Processes booking requests and stores relevant data, allowing users to keep track of their reservations.
    
User Profile Management

  Users can update their profiles, including personal information.
  Ensures data integrity during profile updates.
  
Endpoint Provision

  Provides essential endpoints for frontend functionality, such as hotel search, user authentication, booking management, and user profile management.
  
Technologies Used

Frontend: React.js, Google OAuth, CSS, HTML
Backend: Node.js, Express.js, MongoDB, JWT
  
  
  
