import { Router } from 'express';
import {supportagent,getAllAgents} from "../controllers/supportAgent.conroller.js"
const router = Router();

router.route('/').post(supportagent);
router.route('/').get(getAllAgents);

export default router;
