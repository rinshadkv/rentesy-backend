import { Router } from 'express';
import userRoutes from './userRoutes';
import requestRoutes from './requestRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/requests', requestRoutes);

export default router;
