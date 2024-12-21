const express = require('express');
const router = express.Router();

const User = require('../models/User');


router.get('/', (req, res) => {

    if(req.session.role) return res.redirect('/employees/login'); // Employee Cant Access the users login page
    
    if(req.session.userId) return res.redirect('/main');

    return res.render('Users-Register',{alert:''});
});


router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({
            username,
            email,
            password, 
        });

        const savedUser = await newUser.save();

        req.session.userId = savedUser._id;

        return res.redirect('/main');

    } catch (error) {
        if(error.errorResponse){
            return res.redirect(`/register?alert=The Cradential already exists.`);
        }     
        return res.redirect(`/register?alert=${error.message}`);
    }
});




module.exports = router;
