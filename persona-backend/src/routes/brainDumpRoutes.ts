git remote add origin https://github.com/rohithkh4b3kr3/LifeOS.git
import { Router } from 'express';
import { createBrainDump, getBrainDumps } from '../controllers/brainDumpController';

const router = Router();

router.post('/', createBrainDump);
router.get('/', getBrainDumps);

export default router;
