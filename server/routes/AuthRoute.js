const express = require('express')
const router = express.Router()

const UserCtrl = require('../controllers/UserCtrl')

router.get('/', UserCtrl.getAuthenticated)

module.exports = router;
