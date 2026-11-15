// Request validation middleware
import { validateContactInput } from '../utils/validation.js';
import { HttpError } from '../utils/httpError.js';

export function validateContact(req, res, next) {
  const { isValid, errors, sanitized } = validateContactInput(req.body);
  if (!isValid) {
    throw HttpError.badRequest('Validation failed', errors);
  }
  req.validated = sanitized;
  next();
}

// Generic body parser with size limit
export function bodyParser(options = {}) {
  const { limit = '100kb' } = options;
  return (req, res, next) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      data += chunk;
      if (Buffer.byteLength(data) > parseSize(limit)) {
        req.destroy();
        throw HttpError.badRequest('Request body too large');
      }
    });
    req.on('end', () => {
      try {
        req.body = data ? JSON.parse(data) : {};
      } catch {
        throw HttpError.badRequest('Invalid JSON');
      }
      next();
    });
  };
}

function parseSize(str) {
  const match = str.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|gb)?$/i);
  if (!match) return 100 * 1024;
  const value = parseFloat(match[1]);
  const unit = (match[2] || 'kb').toLowerCase();
  const multipliers = { kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
  return value * (multipliers[unit] || 1024);
}