const express = require('express');
const Tought = require('../models/Tought');
const router = express.Router();
const ToughtController = require('../controllers/toughtController');


router.get('/', ToughtController.showToughts);

module.exports = router;