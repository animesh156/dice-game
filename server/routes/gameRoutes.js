const express = require('express')
const {getBalance, rollDice} = require('../controllers/gameController')
const {protect} = require('../middlewares/authMiddleware')


const router = express.Router()


router.get('/balance', protect, getBalance)
router.post('/roll-dice', protect, rollDice)

module.exports = router