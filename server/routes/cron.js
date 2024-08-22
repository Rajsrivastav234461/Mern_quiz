const express = require('express');
const router = express.Router();
const { evaluateTests } = require('../controllers/cronController');  

 router.get('/evaluate-tests', evaluateTests);

module.exports = router;
