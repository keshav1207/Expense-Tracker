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
router.route('/api/getTransaction/:transactionId').get(controller.getTransaction);
router.route('/api/createTransaction').post(controller.createTransaction);
router.route('/api/deleteTransaction/:transactionId').delete(controller.deleteTransaction);
router.route('/api/updateTransaction/:transactionId').put(controller.updateTransaction);

//User Routes
router.route('/api/getAllUsers').get(controller.getAllUsers);
router.route('/api/getUser/:userId').get(controller.getUser);
router.route('/api/registerUser').post(controller.registerUser);
router.route('/api/deleteUser/:userId').delete(controller.deleteUser);
router.route('/api/updateUser/:userId').put(controller.updateUser);



module.exports = router;