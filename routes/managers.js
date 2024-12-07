const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');



const isManager = (req, res, next) => {
    if (!req.session.userId || req.session.role !== 2) return res.redirect('/employees/login');
    next();
};


router.use('/main', isManager, async (req, res) => {

    return res.render('Managers-Main');
 
});

router.use('/progress', isManager, (req, res) => {
    return res.render('Managers-Progress');
})


router.use('/messages', isManager, (req, res) => {
    return res.render('Managers-Messages');
})


module.exports = router;