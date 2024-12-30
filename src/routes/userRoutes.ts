import { Router } from 'express';
import { sendResetPasswordEmail, saveNewPassword } from '../controllers/userController';

const router = Router();

router.post('/:id/reset-password/send', sendResetPasswordEmail);
router.post('/:id/reset-password/finish', saveNewPassword);

export default router;
