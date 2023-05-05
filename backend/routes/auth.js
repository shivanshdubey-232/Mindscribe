const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult} = require('express-validator');
const brypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'mindscribe';


//Route -1 : Create a user using: POST "/api/auth/createuser". Doesn't require Auth ---------------------------------------------
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 2 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must have atleast 5 characters').isLength({ min: 5 }),
  ], 
  async (req, res)=> {
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({success, email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({success, error: "Sorry a user with this email already exists" })
      }
      // Create a new user
      const salt = await brypt.genSalt(10);
      const secPass = await brypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      success = true;
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success, authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success, error: "Some Error occured"});
    }
  })

//Route 2:  Authenticate a user using: POST "/api/auth/login". No login required--------------------------------------------------
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res)=> {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
        success = false;
        return res.status(400).json({success, error: "Please try to login with correct credentials"});
      }
      const passwordCompare = await brypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct credentials"});
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

//Route3 : Get loggedin User Details using: POST "/api/auth/getuser". Login required---------------------------------------------
router.post('/getuser', fetchuser, async (req, res)=> {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;