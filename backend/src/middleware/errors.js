// Error handling middleware
import { HttpError, isHttpError } from '../utils/httpError.js';

export function notFoundHandler(req, res) {
  throw HttpError.notFound(`Route ${req.method} ${req.path} not found`);
}

export function errorHandler(err, req, res, next) {
  // Log error in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }

  // Known HTTP errors
  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'A record with this value already exists' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' });
  }

  // Validation errors
  if (err.name === 'ValidationError' || err.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation failed', details: err.errors });
  }

  // Unknown errors
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
}