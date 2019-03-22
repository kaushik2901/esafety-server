class Error {
    
    constructor(statusCode, message, tag) {
        this.statusCode = statusCode;
        this.message = message;
        this.tag = tag;
    }

    static argumentError(message, tag = 'ARG_ERROR') {
        return new Error(422, message, tag);
    }

    static authError(message, tag = 'UNAUTHORIZED') {
        return new Error(403, message, tag);
    }

    static internalError(message, tag = 'INTERNAL_SERVER_ERROR') {
        return new Error(500, message, tag);
    }

    static notFound(message, tag = 'NOT_FOUND') {
        return new Error(404, message, tag);
    }

    static DBError(message, tag = 'DB_ERROR') {
        return new Error(500, message, tag);
    }

    toJSON() {
        return {
            status: 'Failure',
            message: this.message
        };
    }

    sendError(res) {
        res
            .status(this.statusCode)
            .json(this.toJSON());
    }
}

module.exports = Error;
  