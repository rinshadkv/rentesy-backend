import { Router } from 'express';
import { createRequest, getAllRequests } from '../controllers/requestController';

const router = Router();

router.post('/', createRequest);
router.get('/', getAllRequests)

export default router;
