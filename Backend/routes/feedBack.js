// const express = require('express');
import { Router } from 'express';
const router = Router();
import feedBackCTRL from '../controllers/feebBackCTRL';

router.post('/message',feedBackCTRL.createFeedBack);
router.get('/message',feedBackCTRL.getFeedBacks);

export default router