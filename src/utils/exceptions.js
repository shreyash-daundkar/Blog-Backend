class HttpException extends Error {

    error;
    statusCode;

    constructor(message, error, statusCode) {
        super(message);
        this.error = error;
        this.statusCode = statusCode;
    };
}

// class BadRequestException extends HttpException {
//     constructor(message, error) {
//         super(message, error, 400);
//     };
// }

class ConflictException extends HttpException {
    constructor(message, error) {
        super(message, error, 409);
    };
}

class NotFoundException extends HttpException {
    constructor(message, error) {
        super(message, error, 404);
    };
}

class UnauthorizedException extends HttpException {
    constructor(message, error) {
        super(message, error, 401);
    };
}

class InternalException extends HttpException {
    constructor(error) {
        super('Internal Exception', error, 500);
    };
}

module.exports = {
    HttpException,
    //BadRequestException,
    NotFoundException,
    UnauthorizedException,
    InternalException,
    ConflictException,
}
