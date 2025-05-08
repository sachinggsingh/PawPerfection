// const express = require('express');
const router = require('express').Router();
const feedBackCTRL = require('../controllers/feebBackCTRL');

router.post('/message',feedBackCTRL.createFeedBack);
router.get('/message',feedBackCTRL.getFeedBacks);

module.exports = router