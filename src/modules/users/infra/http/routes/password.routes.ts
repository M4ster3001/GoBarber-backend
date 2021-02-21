import { Request, Response, Router } from 'express';
import ForgotPasswordCTR from '../controllers/ForgotPasswordCTR';

import ResetPasswordCTR from '../controllers/ResetPasswordCTR';

const passwordRouter = Router();

const forgotPasswordCTR = new ForgotPasswordCTR();
const resetPasswordCTR = new ResetPasswordCTR();

passwordRouter.post('/forgot', forgotPasswordCTR.create);
passwordRouter.post('/reset', resetPasswordCTR.create);

export default passwordRouter;
