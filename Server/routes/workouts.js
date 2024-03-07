const express = require('express')
const workoutModel = require('../models/WorkoutModel')
const {createWorkout,getAllWorkouts , getWorkout , deleteWorkout , updateWorkout} = require('../Controllers/workoutController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

//require to authorize for all workout routes
router.use(requireAuth)


router.get('/',getAllWorkouts)

router.get('/:id',getWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)



module.exports = router