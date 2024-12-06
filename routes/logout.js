const express = require('express');
const router = express.Router();


 
router.post('/', (req, res) => {
    req.session.destroy();
    return res.redirect('/login?alert=logout succefully');
});


module.exports = router;