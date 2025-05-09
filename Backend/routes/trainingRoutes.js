const express =require('express')
const {createTrainingProgram,editTraining,deleteTraining,getAllTrainingPrograms,getTrainingProgramById} = require('../controllers/trainingCTRL')
const router = express.Router()

router.get('/course',getAllTrainingPrograms)
router.get('/course/:id',getTrainingProgramById)
router.post('/create-course',createTrainingProgram)
router.put('/edit-course/:id',editTraining)
router.delete('/delete-course/:id',deleteTraining)

module.exports = router
