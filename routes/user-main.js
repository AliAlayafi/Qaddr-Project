const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // return res.render('Users-Main');

    if(req.session.userId && (!req.session.role)){
        return res.render('Users-Main');
    }else{
        return res.redirect('login');
    }
 
});

module.exports = router;