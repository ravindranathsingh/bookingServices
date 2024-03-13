const { BookingServices } = require('../service/index')
const { StatusCodes } = require('http-status-codes')

const bookingServices = new BookingServices();

const create = async ( req, res ) => {
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

module.exports = { create }