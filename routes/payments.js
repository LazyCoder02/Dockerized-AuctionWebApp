const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-session", paymentController.createPaymentSession);

module.exports = router;
