const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const userauth = require("../middleware/auth") ;


authRouter.post("/signup", async (req, res) => {
  try {
    const { emailID, password ,role , firstName , lastName} = req.body;
    if(!emailID || !password  || !role  || !firstName || !lastName){
      return res.status(400).json({success : false , message : "something wrong.."
      })
    }

    const existingUser = await User.findOne({ emailID: emailID });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Email Already Registered.. " 
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      emailID,
      password: passwordHash ,
      role ,
      firstName ,
      lastName 
    };

    const user = new User(userData);

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "Registration completed successfully",
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed: " + err
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
   
    
    const { password, emailID } = req.body;
    
    if (!emailID || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

  
    const token = await user.userToken();
    user.lastLogin = new Date();
    await user.save();
    
    res.cookie("token", token, { 
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: "Login successful",
      data: userResponse
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed: " + err.message
    });
  }
});

authRouter.post('/logout', async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    res.json({
      success: true,
      message: "Logout successful"
    });
    
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({
      success: false,
      message: "Logout failed: " + err.message
    });
  }
});

module.exports = authRouter;