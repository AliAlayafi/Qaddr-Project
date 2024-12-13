const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Message = require('../models/Message');
const Accident = require('../models/Accident');
const Najem = require('../models/Najem');


const { comparePassword } = require('../utils/passwordUtils'); 



const isEmployee = (req, res, next) => {
    if (!req.session.userId || req.session.role !== 1) return res.redirect('/employees/login');
    next();
};

// router.get('/t',async (req,res) => {
//     const testAccident = new Accident({
//         accident_id: 12345678,
//         images: [
//             "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wCEAAE",
//             "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wCEAAE",
//             "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wCEAAE"
//         ],
//         status: 'Pending',
//     });

//     const savedAccident = await testAccident.save();
// })


router.put('/main/:id', async (req,res) => {
    try{
        if (!req.session.userId || req.session.role !== 1) return res.redirect('/employees/login');
        const accident = await Accident.findOne({ accident_id: req.params.id });
        accident.status = "Rejected"
        accident.message = req.body.reasonText;
        await accident.save();
        return res.status(200).send("Request Rejected Successfully!");
    }catch(err){
        return res.status(400).send("Error Rejected Request!");
    }   
})
router.use('/main/:id',isEmployee,async (req,res) => {

    // check valid accident number
    const accident = await Accident.findOne({ accident_id: req.params.id });
    if(!accident)return res.redirect("/employees/main");

    // Valid accident

    // Get The Data

    console.log(accident)

    accident.images = JSON.parse(accident.images);
    accident.AI_Response = [
        { part: 'front-bumper', price: 5000 },
        { part: 'rear-bumper', price: 5000 }
    ];


    const najemData = await Najem.findOne({ accident_id: req.params.id });
   
    return res.render('Employees-Request', {data:accident,najemData,alert:""});
})

router.use('/main', isEmployee, async (req, res) => {

    const accidents = await Accident.find(
        {status:'Process'},
        'accident_id created_at'
    ).sort({ created_at: 1 });

    return res.render('Employees-Main', {alert:'',requests:accidents});
 
});



router.use('/progress', isEmployee, (req, res) => {
    return res.render('Employees-Progress');
})


router.use('/messages', isEmployee, async (req, res) => {

    try {
        const messages = await Message.find(
            { employee_id: req.session.userId },
            'title message created_at'
        ).sort({ created_at: -1 }); // Sort by most recent messages

        // Render the page and send messages data
        return res.render('Employees-Messages', { messages });
    } catch (err) {
        console.error('Error fetching messages:', err);
        return res.status(500).send('Internal Server Error');
    }

})


router.get('/login', (req, res) => {

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