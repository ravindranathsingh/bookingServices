const { StatusCodes } = require('http-status-codes')

class ServiceError extends Error {
    constructor(
        message = 'Somethig Went Wrong',
        explanation = 'Service layer error',
        statuscode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = 'Service Error',
        this.message = message,
        this.explanation = explanation,
        this.statuscode = statuscode
    }
}

module.exports = ServiceError;