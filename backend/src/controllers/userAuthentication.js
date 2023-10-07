const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registeruser = require('../models/userDetails');
//const middleware = require('../middlewares/AuthMiddleware.js');
const authMiddleware = require('../middlewares/AuthMiddleware');
require('dotenv').config();
const router = express.Router();


let key= process.env.KEY || "jwtSecret" 
console.log(key)
router.post('/google-login', async (req, res) => {
  try {
    const { credential, username, email } = req.body;

    console.log('Received credential:', credential);

    // Check if the user already exists in your database
    let existingUser = await Registeruser.findOne({ email: email });

    // If the user does not exist, save their information to the database
    if (!existingUser) {
      const newUser = new Registeruser({
        username: username,
        email: email,
      });

      await newUser.save();
    }
 // Generate a JWT token for the user
 const payload = {
  user: {
    id:existingUser.id,
    email: email,
    name: username,
    },
};

jwt.sign(payload, key, { expiresIn: '7d' }, (err, token) => {
  if (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
 // Log the generated token
 console.log('Generated JWT token:', token);
   // Respond with the JWT token
   res.json({ message: 'Authentication successful', token: token });
  });
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here, e.g., return an error response
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword, mobileNumber, address, city, country, state } = req.body;

    // Check if the email is already in use (skip this check for updates)
    if (!req.body.isUpdate) {
      const existingUser = await Registeruser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User Already Exists' });
      }
    }

    if (!req.body.isUpdate && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the user's password (only for registration)
    let hashedPassword = password;
    if (!req.body.isUpdate) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Find the user by email and update their profile
    const user = await Registeruser.findOneAndUpdate(
      { email },
      {
        $set: {
          username,
          email,
          password: hashedPassword,
          mobileNumber,
          address,
          city,
          country,
          state,
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: 'Profile Updated Successfully', user });
  } catch (error) {
    console.error('Error:', error);

    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate Email' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/login',async (req,res)=>{
  try{
     const {email,password}=req.body
     let exist= await Registeruser.findOne({email});
if(!exist){
  return res.status(400).send('User Not Found')
}

 // Compare the provided password with the stored hashed password
 const passwordMatch = await bcrypt.compare(password, exist.password);

 if (!passwordMatch) {
   return res.status(400).send('Incorrect Password');
 }

let payload={
  user:{
    id:exist.id,
    name: exist.username,
    
  }
}
console.log(payload.user.id,payload.user.name)

jwt.sign(payload,key,{expiresIn:'7d'},
  (err,token)=>{
  if(err) throw err;
  return res.json({token})
}
)

 }catch(err){
    console.log('Error is:',err)
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/myprofile',authMiddleware,async(req,res)=>{
  try{

    let exist=await Registeruser.findById(req.user.id);
    console.log('User found:', exist);
    if(!exist){
      return res.status(400).send('user not found')
    }
    res.json(exist);
  }catch(err){
    console.log('Error is:',err)
    return res.status(500).send('Internal Server Error')
  }
})

// PUT route to update user profile
router.put('/usersUpdate/:userID', authMiddleware, async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.params.userID; // Corrected parameter name
    console.log("userId", userId);

    // Check if the authenticated user matches the user being updated
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Forbidden - You do not have permission to update this user' });
    }

    // Get the updated user data from the request body
    const updatedUserData = req.body;

    console.log("updateUserData", updatedUserData);

    // Example: Assuming you have a MongoDB User model
    const user = await Registeruser.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = updatedUserData.username;
    user.email = updatedUserData.email;
    user.phoneNumber = updatedUserData.phoneNumber;
    user.address = updatedUserData.address;
    user.city = updatedUserData.city;
    user.state = updatedUserData.state;
    user.country = updatedUserData.country;

    // Save the updated user data
    const updatedUser = await user.save();

    console.log("user data update", updatedUser);

    // Respond with the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // You can clear the token from the client-side (e.g., cookies or local storage) if needed.
  // Invalidating the token on the server-side is not typically necessary.

  // You can also implement more complex logout logic here if necessary.

  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
