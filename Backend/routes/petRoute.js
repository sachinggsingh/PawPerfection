const express = require('express');
const router = express.Router();
const petCTRL = require('../controllers/petCTRL');


router.post('/pet-profile',petCTRL.createPet);
router.get('/pet-profile/:id',petCTRL.getPets);
router.put('/pet-profile/:id',petCTRL.editPet);
router.delete('/pet-profile/:id',petCTRL.deletePet);

module.exports = router