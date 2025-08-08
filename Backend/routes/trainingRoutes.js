import { Router } from 'express'
const router = Router()
import {createTrainingProgram,getTrainingPrograms,getTrainingProgramBtID,updateTrainingProgram,deleteTrainingProgram} from '../controllers/trainingCTRL.js'

import auth from '../middleware/auth.js'


router.get('/courses',getTrainingPrograms);
router.get('/courses/:id',auth,getTrainingProgramBtID);
router.post('/courses',createTrainingProgram);
router.put('/courses/:id',updateTrainingProgram);
router.delete('/courses/:id',deleteTrainingProgram);

export default router
