const router = require('express').Router()
const {addTask, completedTask, deleteTask, homePage} = require('../controllers/tasks')

router.get('/', homePage)
router.post('/add-task', addTask)
router.put('/completed-task', completedTask)
router.delete('/delete-task', deleteTask)

module.exports = router