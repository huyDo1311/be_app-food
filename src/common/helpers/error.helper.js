import { responseError } from './response.helper.js';

export const handleError = (err, req, res, next) => {
    const resData = responseError(err.message, err.code, err.stack)
    res.status(resData.code).json(resData)
    next(error)
}

export class BadRequestException extends Error {
    constructor(message = `BadRequestException`) {
        super(message)
        this.code = 400
    }
}

export class ForbiddenException extends Error {
    constructor(message = `ForbiddenException`) {
        super(message)
        this.code = 403
    }
}