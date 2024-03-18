const { BookingServices } = require('../service/index')
const { StatusCodes } = require('http-status-codes')

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/server-config');

const bookingServices = new BookingServices();

class BookingController {

    constructor(channel) {
    }

    async sendMessageTOQueue( req, res ) {
        const channel = await createChannel()
        const data = {message: 'Success'}
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data))
        return res.status(200).json({
            message: "Successfully published the event"
        })
    }

    async create( req, res ) {
        try {
            const response = await bookingServices.createBooking(req.body)
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully completed booking',
                err: {}
            })
        } catch (error) {
            return res.status(error.statuscode).json({
                data: {},
                success: false,
                message: error.message,
                err: error.explanation
            })
        }
    }
}

module.exports = BookingController