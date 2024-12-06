const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { comparePassword } = require('../utils/passwordUtils'); 
 

router.get('/', (req, res) => {
    if(req.session.userId) return res.redirect('/main');
    
    return res.render('Users-Login',{alert:''});
});


// POST route for user login
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user)throw new Error("Cridentials are incorrect"); // Check if the user exists in the database

        const isPasswordCorrect = await comparePassword(password, user.password);

        if(!isPasswordCorrect)throw new Error("Cridentials are incorrect"); // Check if the password is correct

        req.session.userId = user._id;
        return res.redirect('/main');

    } catch (err) {
        return res.status(500).render('Users-Login', { alert: err.message });
    }
});


module.exports = router;
