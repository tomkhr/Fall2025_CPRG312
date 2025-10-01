const express = require('express');
const User = require('../models/User');
const argon2 = require('argon2');       // Library to create hash
const jwt = require('jsonwebtoken');    // Library to generate JWT token

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {email, password, name} = req.body;

        console.log(`Email: ${email}`);

        const hashPassword = await argon2.hash(password);

        const newUser = new User(
            {
                email: email, 
                password: hashPassword, 
                name: name,
                role: role
            }
        );

        await newUser.save();

        res.status(201). json({message: 'User is registered successfully'});
        
    } catch(err) {
        console.error(`Error in user registration`);
        console.error(err);
    }
});

router.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;
        console.log(`Login request for ${email}`);

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid user name or password"});
        }

        const isMatch = await argon2.verify(user.password, password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid user name or password"});
        }

        const token = jwt.sign(
            {
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('auth_token', token, {
            httpOnly: true, // CRITICAL: Prevents client-side JS from accessing the cookie.
            secure: false, // Set it true for HTTPS (production environment)
            maxAge: 1000 * 60 * 60 // Match token expiration (15 minutes)
        });
        res.status(200).json({
            message: "Login successful",
            name: user.name,
            email: user.email,
        });
    } catch(error) {
        console.error("Error while login");
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
});

module.exports = router;