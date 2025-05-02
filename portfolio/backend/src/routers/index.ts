import { Router } from 'express';
import portfoliosRouter from './portfolios';
import worksRouter from './works';
import skillsRouter from './skills';
import skillDetailsRouter from './skill-details';

const router = Router();


router.use('/portfolios', portfoliosRouter);
router.use('/works', worksRouter);
router.use('/skills', skillsRouter);
router.use('/skill-details', skillDetailsRouter);

export default router;