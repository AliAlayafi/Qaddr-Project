const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Message = require('../models/Message');
const Accident = require('../models/Accident');
const Najem = require('../models/Najem');





const isManager = (req, res, next) => {
    if (!req.session.userId || req.session.role !== 2) return res.redirect('/employees/login');
    next();
};



router.put('/main/:id', async (req,res) => {
  try{
      if (!req.session.userId || req.session.role !== 2) return res.redirect('/employees/login');
      const accident = await Accident.findOne({ accident_id: req.params.id });
      accident.status = "Complete";
      await accident.save();
      return res.status(200).send("Request Rejected Successfully!");
  }catch(err){
      return res.status(400).send("Error!");
  }   
})
router.post('/main/:id', async (req,res) => {
  try{
    if (!req.session.userId || req.session.role !== 2) return res.redirect('/employees/login');
      const accident = await Accident.findOne({ accident_id: req.params.id });
      accident.response_at = new Date();
      accident.AI_Response = req.body;
      accident.status = "Complete";
      await accident.save();
      return res.status(200).send("Request Sent Successfully!");
  }catch(err){
      return res.status(400).send("Error!");
  }   
})




router.use('/main/:id',isManager,async (req,res) => {

  // check valid accident number
  const accident = await Accident.findOne({ accident_id: req.params.id, status: "Objection" });
  if(!accident)return res.redirect("/managers/main");

  // Valid accident

  accident.images = JSON.parse(accident.images);

  const employee_name = await Employee.findOne({ _id: accident.employee_id }, 'username');
  accident.name = employee_name.username;
  const najemData = await Najem.findOne({ accident_id: req.params.id });
 
  return res.render('Managers-Request', {data:accident,najemData,alert:""});
})

router.use('/main', isManager, async (req, res) => {

    const accidents = await Accident.find(
      {status:'Objection'},
      'accident_id created_at'
    ).sort({ created_at: 1 });

  return res.render('Managers-Main', {alert:'',requests:accidents});
 
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