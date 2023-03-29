const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/get/:userId', userController.getUser)

router.post('/add', userController.addUser)

router.get('/getAll', userController.getAll)





module.exports = router;
