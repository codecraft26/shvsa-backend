import { Router } from 'express';
import {supportagent} from "../controllers/supportAgent.conroller.js"
const router = Router();

router.route('/').post(supportagent);

export default router;
