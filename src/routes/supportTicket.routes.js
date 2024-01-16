import { Router } from 'express';
import { createSupportTicket ,getAllTickets} from '../controllers/supportTicket.controller.js';
const router = Router();

router.route('/').post(createSupportTicket);
router.route('/').get(getAllTickets);

export default router;
