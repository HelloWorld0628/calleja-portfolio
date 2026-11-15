// Contact routes
import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { validateContact } from '../middleware/validation.js';

const router = express.Router();

// Public endpoint
router.post('/', validateContact, submitContact);

export default router;