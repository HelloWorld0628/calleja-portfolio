// Contact controller - HTTP layer
import { createContactMessage, getContactMessages, getMessageStats } from '../services/contact.js';
import { HttpError } from '../utils/httpError.js';

// Public: Submit contact form
export async function submitContact(req, res) {
  const { name, email, message } = req.validated;
  const record = await createContactMessage({ name, email, message });
  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    id: record.id,
  });
}

// Admin: List messages with pagination
export async function listMessages(req, res) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
  const status = req.query.status;

  const result = await getContactMessages({ page, limit, status });
  res.json(result);
}

// Admin: Get message stats
export async function getStats(req, res) {
  const stats = await getMessageStats();
  res.json(stats);
}

// Admin: Get single message
export async function getMessage(req, res) {
  const id = parseInt(req.params.id);
  if (!id) throw HttpError.badRequest('Invalid message ID');
  const message = await getContactMessages({ page: 1, limit: 1 }).then(r => r.messages[0]);
  // Actually fetch single
  const { getContactMessage } = await import('../services/contact.js');
  const single = await getContactMessage(id);
  res.json(single);
}

// Admin: Update message status
export async function updateStatus(req, res) {
  const id = parseInt(req.params.id);
  if (!id) throw HttpError.badRequest('Invalid message ID');
  const { status } = req.body;
  if (!status) throw HttpError.badRequest('Status is required');
  const { updateMessageStatus } = await import('../services/contact.js');
  const updated = await updateMessageStatus(id, status);
  res.json(updated);
}

// Admin: Delete message
export async function deleteMessage(req, res) {
  const id = parseInt(req.params.id);
  if (!id) throw HttpError.badRequest('Invalid message ID');
  const { deleteContactMessage } = await import('../services/contact.js');
  await deleteContactMessage(id);
  res.json({ success: true, message: 'Message deleted' });
}