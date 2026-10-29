import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/settings (Public)
router.get('/', (_req: Request, res: Response) => {
  const settings = db.getSettings();
  res.json({
    success: true,
    data: settings
  });
});

// PUT /api/settings (Protected)
router.put('/', requireAdmin, (req: Request, res: Response) => {
  const updates = req.body;
  const updated = db.updateSettings(updates);
  res.json({
    success: true,
    data: updated,
    message: 'Store settings updated successfully.'
  });
});

export default router;
