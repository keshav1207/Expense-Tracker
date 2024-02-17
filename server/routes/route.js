const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller");


router.route('/').get(controller.create_Categories);

module.exports = router;