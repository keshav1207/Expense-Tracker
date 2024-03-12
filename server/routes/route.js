const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller");


router.route('/createCategory').post(controller.createCategory);
router.route('/getCategory').get(controller.getCategory);
router.route('/deleteCategory').delete(controller.deleteCategory);

module.exports = router;