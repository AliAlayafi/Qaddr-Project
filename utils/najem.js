
const Najem = require('../models/Najem');


async function check_aid(aid) {
        const result = await Najem.findOne({ accident_id: aid })
        return result;
}

module.exports = {check_aid};