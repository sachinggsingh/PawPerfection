const express =require('express')
const {createTrainingProgram,editTraining,deleteTraining,getAllTrainingPrograms,getTrainingProgramById} = require('../controllers/trainingCTRL')
const router = express.Router()

router.get('/training',getAllTrainingPrograms)
router.get('/training/:id',getTrainingProgramById)
router.post('/create-training',createTrainingProgram)
router.put('/edit/:id',editTraining)
router.delete('/delete/:id',deleteTraining)

module.exports = router
