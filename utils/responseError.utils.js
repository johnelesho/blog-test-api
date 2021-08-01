class ResponseError extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ResponseError;
