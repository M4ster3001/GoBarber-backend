import { Router } from 'express';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileCTR from '../controllers/ProfileCTR';

const profileRouter = Router();
const profileCTR = new ProfileCTR();

profileRouter.use(ensuredAuthenticated);

profileRouter.get('/', profileCTR.show);
profileRouter.put('/', profileCTR.update);

export default profileRouter;
