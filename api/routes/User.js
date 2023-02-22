const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Endpoint for registering new users
router.post('/register', async (req, res) => {
  try {
    // Check if the user already exists


    // Create a new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    // Send a response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
    try {
      // Check if the user exists
      const user = await User.findOne({ username : req.body.username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Create a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      // Send a response
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  module.exports = router;