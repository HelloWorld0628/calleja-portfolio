// Admin routes - protected
import express from 'express';
import {
  listMessages,
  getStats,
  getMessage,
  updateStatus,
  deleteMessage,
} from '../controllers/contactController.js';

const router = express.Router();

// All routes here require admin auth (add middleware later)
// router.use(requireAdmin);

// Message management
router.get('/messages', listMessages);
router.get('/messages/stats', getStats);
router.get('/messages/:id', getMessage);
router.patch('/messages/:id/status', updateStatus);
router.delete('/messages/:id', deleteMessage);

export default router;