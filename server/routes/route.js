const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller");

//Category Routes
router.route('/getAllCategories').get(controller.getAllCategories);
router.route('/getCategory').get(controller.getCategory);
router.route('/createCategory').post(controller.createCategory);
router.route('/deleteCategory').delete(controller.deleteCategory);


// Transaction Routes
router.route('/getAllTransactions').get(controller.getAllTransactions);
router.route('/getTransaction').get(controller.getTransaction);
router.route('/createTransaction').post(controller.createTransaction);
router.route('/deleteTransaction').delete(controller.deleteTransaction);


module.exports = router;