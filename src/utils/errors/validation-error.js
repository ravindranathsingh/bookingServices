const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error {
    constructor(
        explanation = [],
        statuscode = StatusCodes.BAD_REQUEST
    ) {
        this.name = 'Validation Error',
        this.message = 'Not able to validate the data sent into the request',
        this.explanation = explanation,
        this.statuscode = statuscode
    }
}

module.exports = ValidationError;