import { Router } from 'express';
import { createSupportTicket } from '../controllers/supportTicket.controller.js';
const router = Router();

router.route('/').post(createSupportTicket);

export default router;
