const express = require('express');
const Najem = require('../utils/najem');
const Accident = require('../models/Accident');


const router = express.Router();

router.get('/', async (req, res) => {

    if(!(req.session.userId && (!req.session.role)))
        return res.redirect('login');

    const Accidents = await Accident.find(
        { user_id: req.session.userId },
        'accident_id created_at status message AI_Response'
    ).sort({ created_at: -1 }); 

    return res.render('Users-Main', {alert:'',aid:"",data:Accidents});
});


router.put('/:id', async (req, res) => {
    try {
        // get the aid
        // check the accident id for the same user and the state is Reviewed
        // if so edit the accident status to objection and put the message
        const aid  = req.params.id;
        const reason  = req.body.reason;

        if(!reason.length)return res.status(400).send("BAD"); // reason is empty

        const accident_info = await Accident.findOne({ accident_id: aid, user_id: req.session.userId });

        if(!accident_info)return res.status(400).send("BAD"); // The Accident not found or its not for this user
        
        if(accident_info.status === "Reviewed"){
            accident_info.status = "Objection";
            accident_info.message = reason;
            await accident_info.save();
        }else if(accident_info.status === "Complete"){
            accident_info.status = "Appointment";
            accident_info.message = reason;
            await accident_info.save();
        }else{
            return res.status(400).send("BAD");
        }

        return res.status(200).send("OK");
    } catch (error) {
        return res.status(400).send("BAD");

    }

});


router.post('/', async (req, res) => {

    try {
        const result = await Najem.check_aid(req.body.aid);
        if(!result)
            return res.redirect('/main?alert=Can\'t find the Accident Number');

        const Accidents = await Accident.find(
            { user_id: req.session.userId },
            'accident_id created_at status'
        ).sort({ created_at: -1 }); 
        const find = await Accident.findOne({ accident_id: req.body.aid})
        if(!find || find.status === "Rejected"){
             return res.render('Users-Main', {alert:"","aid":req.body.aid,data:Accidents});
        }

        return res.render('Users-Main', {alert:"The accident report has already been submitted","aid":"",data:Accidents});
    } catch (error) {
        return res.redirect('/main?alert=Can\'t find the Accident Number');
    }

});



// Handle The Images Upload
router.post("/upload", async (req, res) => {
    try {

        const accident_id = req.body.aid;
        const images = req.body.images;
        const result = await Najem.check_aid(accident_id);
        if (!result) {
            return res.redirect('/main?alert=Can\'t find the Accident Number');
        }

        const Accidents = await Accident.findOne({ accident_id }); 

        if(!Accidents){


            // Create New Report 
            const newAccident = new Accident({
                accident_id,
                images,
                status: 'Pending',
                user_id: req.session.userId,
            });

            await newAccident.save();
            return res.redirect('/main?alert=Accident Photos Uploaded Successfully!');


        }else{

            
    
            if(Accidents.status != "Rejected"){    
                // The Report Already Exist  
                return res.redirect('/main?alert=The accident report has already been submitted');
            }
    
            if(Accidents.status == "Rejected"){
                // Update the old Report
                Accidents.images = images;
                Accidents.message = "";
                Accidents.status = 'Pending'; 
                await Accidents.save(); // Save the updated record
                return res.redirect('/main?alert=Accident Photos Updated Successfully!');
    
            }  


        }

       

    } catch (error) {
        console.log(error)
        return res.redirect('/main?alert=An error occurred while processing your request. Please try again.');
    }
});





module.exports = router;