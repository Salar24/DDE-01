const express = require('express');
const router = express.Router();

const MasterQueries = require('../controllers/MasterQueries')

router.post('/Add', MasterQueries.addRandomData)
router.delete('/delete', MasterQueries.deleteData)


module.exports = router;
