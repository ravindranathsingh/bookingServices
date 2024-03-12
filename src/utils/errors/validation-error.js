const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error {
    constructor(error) {
        super();
        let explanation = []
        error.errors.forEach((err) => {
            explanation.push(err.message)
        })
        this.name = 'Validation Error',
        this.message = 'Not able to validate the data sent into the request',
        this.explanation = explanation,
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;