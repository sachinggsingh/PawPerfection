const express = require('express');
const router = express.Router();

const videoCTRL = require('../controllers/videoCTRL');

router.post('/create',videoCTRL.createVideo);
// router.get('/video',videoCTRL.getAllVideos);
router.get('/show/:id',videoCTRL.showVideo);
router.put('/update/:id',videoCTRL.updateVideo);
router.delete('/delete/:id',videoCTRL.deleteVideo);

module.exports = router