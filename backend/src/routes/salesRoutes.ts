// backend/src/routes/salesRoutes.ts
import { Router } from 'express';
import { getSales, getFilterOptions } from '../controllers/salesController';

const router = Router();

router.get('/', getSales);
router.get('/filter-options', getFilterOptions);

export default router;
