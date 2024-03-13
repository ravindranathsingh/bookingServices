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
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightRequestURL);
            return flight;
        } catch (error) {
            throw new ServiceError();
        }
    }
}

module.exports = BookingServices;