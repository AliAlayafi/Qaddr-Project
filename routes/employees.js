const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const { comparePassword } = require('../utils/passwordUtils'); 



const isEmployee = (req, res, next) => {
    if (!req.session.userId || req.session.role !== 1) return res.redirect('login');
    next();
};


router.use('/main', isEmployee, async (req, res) => {

    return res.render('Employees-Main', {alert:''});
 
});

router.use('/progress', isEmployee, (req, res) => {
    return res.render('Employees-Progress');
})


router.use('/messages', isEmployee, (req, res) => {
    return res.render('Employees-Messages');
})


router.get('/login', (req, res) => {
    console.log(1,req.session.userId,req.session.role)
    if(!req.session.userId) return res.render('Employees-Login', {alert:''});

    if(!req.session.role) return res.redirect('/main'); // Logged User Cant Access the Employee login page

    if(req.session.role == 2) return res.redirect('/managers/main'); // Manager

    return res.redirect('main'); // Employee;

})
router.post('/logout',  (req, res) => {
    req.session.destroy();
    return res.redirect('login?alert=You have been logged out');
})

router.post('/login', async (req,res) => {
    try {
        const { username, password } = req.body;

        const user = await Employee.findOne({ username });

        if (!user)throw new Error("Cridentials are incorrect"); // Check if the user exists in the database

        const isPasswordCorrect = await comparePassword(password, user.password);

        if(!isPasswordCorrect)throw new Error("Cridentials are incorrect"); // Check if the password is correct

        req.session.userId = user._id;
        req.session.role = user.role;

        return res.redirect('main?alert=You have been logged in');

    } catch (err) {
        return res.status(500).render('Employees-Login', { alert: err.message });
    }
})



module.exports = router;