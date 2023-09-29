const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registeruser = require('../models/userDetails');
const middleware = require('../middleware/authMiddleware');


const router = express.Router();

let key="jwtSecret"

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
    const { username, email, password, confirmPassword } = req.body;

    // Check if the email is already in use
    const existingUser = await Registeruser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User Already Exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new Registeruser({
      username,
      email,
      password: hashedPassword,
      confirmpassword:hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ message: 'Registration Successful' });
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

router.get('/myprofile',middleware,async(req,res)=>{
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

module.exports = router;
