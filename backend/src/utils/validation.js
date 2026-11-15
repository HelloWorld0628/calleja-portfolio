// Validation utilities
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactInput(data) {
  const errors = {};
  const { name, email, message } = data || {};

  if (!name || !name.trim()) {
    errors.name = 'Name is required';
  } else if (name.trim().length > 120) {
    errors.name = 'Name must be 120 characters or fewer';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Invalid email format';
  } else if (email.trim().length > 191) {
    errors.email = 'Email must be 191 characters or fewer';
  }

  if (!message || !message.trim()) {
    errors.message = 'Message is required';
  } else if (message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters';
  } else if (message.trim().length > 5000) {
    errors.message = 'Message must be 5000 characters or fewer';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      message: message?.trim(),
    },
  };
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Remove control chars
    .trim();
}