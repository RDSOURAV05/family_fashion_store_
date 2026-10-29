import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/orders (Public - triggered upon WhatsApp checkout generation)
router.post('/', (req: Request, res: Response) => {
  const { customer, items, subtotal, shipping, total } = req.body;

  if (!customer || !customer.fullName || !customer.phone || !customer.deliveryAddress) {
    return res.status(400).json({
      success: false,
      message: 'Customer name, phone number, and delivery address are required.'
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order items are required.'
    });
  }

  const order = db.createOrder({
    customer,
    items,
    subtotal: Number(subtotal),
    shipping: Number(shipping) || 0,
    total: Number(total),
    status: 'Pending',
    channel: 'WhatsApp',
    paymentMethod: 'WhatsApp Order / Manual Confirmation',
    paymentStatus: 'Pending'
  });

  res.status(201).json({
    success: true,
    data: order,
    message: 'Order saved and prepared for WhatsApp submission.'
  });
});

// GET /api/orders (Protected)
router.get('/', requireAdmin, (req: Request, res: Response) => {
  const orders = db.getOrders();
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// GET /api/orders/:id (Protected)
router.get('/:id', requireAdmin, (req: Request, res: Response) => {
  const order = db.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
  res.json({ success: true, data: order });
});

// PATCH /api/orders/:id/status (Protected)
router.patch('/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Contacted on WhatsApp', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid order status value.' });
  }

  const updated = db.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  res.json({ success: true, data: updated });
});

export default router;
