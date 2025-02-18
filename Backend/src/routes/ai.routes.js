const express=require('express');
const router = express.Router();

const aiController = require('../Controller/ai.Controller')


router.post('/getReview',aiController.getResponse)


module.exports = router;
