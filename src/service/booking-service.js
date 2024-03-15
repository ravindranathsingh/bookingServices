const axios = require('axios');

const { BookingRepository } = require('../repository/index')
const { ServiceError } = require('../utils/index');

const { FLIGHT_SERVICE_PATH } = require('../config/server-config')

class BookingServices {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            const priceOfTheFlight = flightData.price;
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError(
                    'Something went wrong in booking process', 
                    'Insufficient Seats in the Flight'
                )
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayLoad = {...data, totalCost}
            const booking = await this.bookingRepository.create(bookingPayLoad)
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
            await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats})
            const finalBooking  = await this.bookingRepository.update(booking.id, {status: 'Booked'})
            return finalBooking;
        } catch (error) {
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingServices;