import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/contact (Public)
router.post('/', (req: Request, res: Response) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone number, and message are required.'
    });
  }

  const savedMessage = db.createContactMessage({
    name,
    phone,
    email: email || '',
    subject: subject || 'General Inquiry',
    message
  });

  res.status(201).json({
    success: true,
    data: savedMessage,
    message: 'Thank you for reaching out to Chic Store! We have received your message.'
  });
});

// GET /api/contact (Protected)
router.get('/', requireAdmin, (req: Request, res: Response) => {
  const messages = db.getContactMessages();
  res.json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// PATCH /api/contact/:id/status (Protected)
router.patch('/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const valid = ['Unread', 'Replied', 'Archived'];

  if (!valid.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid message status.' });
  }

  const updated = db.updateContactMessageStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }

  res.json({ success: true, data: updated });
});

export default router;
