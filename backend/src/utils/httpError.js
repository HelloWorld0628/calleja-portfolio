// Custom HTTP error class for consistent error handling
export class HttpError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details) {
    return new HttpError(400, message, details);
  }

  static unauthorized(message = 'Unauthorized') {
    return new HttpError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new HttpError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new HttpError(404, message);
  }

  static conflict(message, details) {
    return new HttpError(409, message, details);
  }

  static internal(message = 'Internal server error') {
    return new HttpError(500, message);
  }

  static serviceUnavailable(message = 'Service temporarily unavailable') {
    return new HttpError(503, message);
  }
}

export function isHttpError(error) {
  return error instanceof HttpError;
}