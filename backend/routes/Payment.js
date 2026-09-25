const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

router
    .post('/create-order', paymentController.createOrder)
    .post('/capture-order/:orderID', paymentController.captureOrder)

module.exports = router;
    