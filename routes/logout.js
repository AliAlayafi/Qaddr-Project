const express = require('express');
const router = express.Router();


 
router.post('/', (req, res) => {
    req.session.destroy();
    return res.redirect('/login?alert=You have been logged out');
});


module.exports = router;