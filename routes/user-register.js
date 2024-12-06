const express = require('express');
const router = express.Router();

const { hashPassword } = require('../utils/passwordUtils'); 

const User = require('../models/User');


router.get('/', (req, res) => {
    if(req.session.userId) return res.redirect('/main');

    
    return res.render('Users-Register',{alert:''});
});


router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });

        const savedUser = await newUser.save();

        req.session.userId = savedUser._id;
        console.log(req.session.userId)
        
        return res.status(200).json({ message: 'User registered successfully!' });

    } catch (error) {
        return res.status(400).render('Users-Register',{alert:'Invalid credentials! user or email is already exist.'});
    }
});




module.exports = router;
