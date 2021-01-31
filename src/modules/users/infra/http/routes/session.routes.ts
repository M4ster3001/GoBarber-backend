import { Request, Response, Router } from 'express';
import SessionCTR from '../controllers/SessionsCTR';

const sessionsRouter = Router();

const sessionCTR = new SessionCTR();

sessionsRouter.post('/', sessionCTR.create);

export default sessionsRouter;
