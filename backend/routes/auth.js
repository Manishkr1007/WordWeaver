import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = express.Router();

// Create a new account
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    console.log('Signup request:', req.body);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
    console.log('Signup error:', error);
  }
});


// Logout user
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) { return res.status(500).send(err); }
    res.redirect('/'); // Adjust to your logout landing page
  });
});


// // Middleware to check if the user is authenticated
// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(401).json({ message: "Unauthorized" });
// };

// // Route to get the currently authenticated user's data
// router.get('/me', ensureAuthenticated, async (req, res) => {
//   try {
//     // Assuming `req.user` is populated by Passport
//     const user = await User.findById(req.user.id).select('-password'); // Exclude password field
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
router.post('/google-login', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user already exists
    const user = await User.findOne({ email });

    

    // If the user exists, respond with the user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in with Google:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body); // Log request body


  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login error:", error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});




router.post('/google-signup', async (req, res) => {
  const { email, name } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    // If the user does not exist, create a new user
    if (!user) {
      user = new User({
        email,
        name,
        // No password needed for Google signup
      });
      await user.save(); // Save the user in MongoDB
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error signing up with Google:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
