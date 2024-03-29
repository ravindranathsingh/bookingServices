const express = require('express')

const { BookingController } = require('../../controller/index')
const bookingController = new BookingController()

const router = express.Router();

router.post('/bookings', bookingController.create)
router.post('/publish', bookingController.sendMessageTOQueue)

module.exports = router;