const express = require('express');
const router = express.Router();
const userCTRL = require('../controllers/userCTRL');

router.post('/register',userCTRL.createUser);
router.post('/login',userCTRL.loginUSer);
router.get('/logout',userCTRL.logoutUSer);


module.exports = router