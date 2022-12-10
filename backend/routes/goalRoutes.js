const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, setGoal)
// Below routes are the same as above
// router.get('/', getGoals)

// router.post('/', setGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

// Below routes are the same as above
// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)

module.exports = router