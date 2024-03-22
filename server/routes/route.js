const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller");

//Category Routes
router.route('/api/getAllCategories').get(controller.getAllCategories);
router.route('/api/getCategory').get(controller.getCategory);
router.route('/api/createCategory').post(controller.createCategory);
router.route('/api/deleteCategory').delete(controller.deleteCategory);


// Transaction Routes
router.route('/api/getAllTransactions').get(controller.getAllTransactions);
router.route('/api/getTransaction').get(controller.getTransaction);
router.route('/api/createTransaction').post(controller.createTransaction);
router.route('/api/deleteTransaction').delete(controller.deleteTransaction);
router.route('/api/updateTransaction/:transactionId').put(controller.updateTransaction);


module.exports = router;