import { Router } from 'express';
import { getSuggestions, trackFinance, getGoals, createGoal, updateGoal, getReport } from '../controllers/financeController';

const router = Router();

router.post('/track', trackFinance);
router.get('/suggestions/:userId', getSuggestions);
router.get('/goals/:userId', getGoals);
router.post('/goals', createGoal);
router.put('/goals/:goalId', updateGoal);
router.get('/report/:userId', getReport);

export default router;