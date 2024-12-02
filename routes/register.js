const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Users-Register');
});

module.exports = router;
