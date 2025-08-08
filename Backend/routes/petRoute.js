import { Router } from 'express';
const router = Router();
import petCTRL from '../controllers/petCTRL.js';
import auth from '../middleware/auth.js';

router.post('/pet-profile', auth, petCTRL.createPet);
router.get('/pet-profile/:id', auth, petCTRL.getPets);
router.get('/pets', auth, petCTRL.getAllPets);
router.put('/pet-profile/:id', auth, petCTRL.editPet);
router.delete('/pet-profile/:id', auth, petCTRL.deletePet);

export default router