const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller");

//Category Routes
router.route('/createCategory').post(controller.createCategory);
router.route('/getCategory').get(controller.getCategory);
router.route('/deleteCategory').delete(controller.deleteCategory);

// Transaction Routes
router.route('/createTransaction').post(controller.createTransaction);
router.route('/getTransaction').get(controller.getTransaction);
router.route('/deleteTransaction').delete(controller.deleteTransaction);


module.exports = router;