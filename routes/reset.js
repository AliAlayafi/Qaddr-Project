const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');
const Reset = require('../models/Reset');


const { sendEmail,formatEmail } = require('../utils/email'); 
const { hashPassword } = require('../utils/passwordUtils'); 

 

router.get('/', (req, res) => {

    if(req.session.userId) return res.redirect('/main');

    return res.render('Users-Reset',{alert:''});
});


// POST route for user reset password
router.post('/', async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (!user)throw new Error("Can't find the user"); // Check if the user exists in the database

        const already_sent = await Reset.findOne({ user_id: user._id });
        if(already_sent) throw new Error("Reset link already sent"); // Check if the reset link has already been sent


        const userEmail = user.email;
        let resetLink = uuidv4(); // Generate a uuid

        const newReset = new Reset({
            user_id: user._id,  
            link: resetLink,
        });

        await newReset.save();


        // Send the email to the user
        const email = await sendEmail(username, userEmail, `http://localhost:3000/reset/${resetLink}`);
        
        if(!email) throw new Error("Something went wrong while sending the email"); // Handle this when email not sent successfully

        const cryptedEmail = await formatEmail(userEmail);

        return res.redirect(`/reset?alert=Reset Link sent successfly check ${cryptedEmail}`); // Redirect to reset password page with success alert

    } catch (err) {
        return res.status(500).render('Users-Reset', { alert: err.message});
    }
});


// Handle the reset password link
router.get('/:id', async (req, res) => {

    try {

    const id = req.params.id;
    // check if the id exists in the reset-password database
    const reset = await Reset.findOne({link:id});

    if(!reset) throw new Error("Reset link not found"); // Handle this when reset link not found

    const {username} = await User.findOne({ _id: reset.user_id }, "username");

    return res.render('Reset-Password', {id,username});

    } catch (error) {
        return res.status(404).render("Not-Found");
    }

}) 



router.post('/:id', async (req, res) => {

    try {
    
        const id = req.params.id;
        // check if the id exists in the reset-password database
        const reset = await Reset.findOne({link:id});

        if(!reset) throw new Error("Reset link not found"); // Handle this when reset link not found

        const password = req.body.password;
        const hashedPassword = await hashPassword(password);
        await User.findByIdAndUpdate(reset.user_id, { password: hashedPassword });

        // delete the reset record
        await Reset.findByIdAndDelete(reset._id);

        return res.redirect("/login?alert=Password reset successfully. Please login.");

    } catch (error) {
        return res.status(404).render("Not-Found");
    }

})




module.exports = router;
