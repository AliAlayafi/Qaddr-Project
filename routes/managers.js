const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Message = require('../models/Message');




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



router.post('/messages', async (req, res) => {
   try {

     const {employeeId, title, message} = req.body;
     const create_message = new Message({
         title: title,
         message: message,
         employee_id: employeeId,
         manager_id:req.session.userId,
     })
     await create_message.save();
     return res.redirect('messages?alert=Message Sent Successfully');

   } catch (error) {
     return res.redirect('messages?alert=Error Ocurred');
   }

});
router.use('/messages', isManager, async (req, res) => {

        const employees = await Employee.find({ role: 1 }, 'username');
        return res.render('Managers-Messages', { names: employees, alert:'' });

});




module.exports = router;