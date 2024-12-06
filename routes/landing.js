const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
    // Pass the alert message to the template
    res.render('Landing-Page', { alert: "" });
});

module.exports = router;
