import { Router } from 'express';
import { listLogsController } from '../Controllers/logsController';

const router = Router();

router.get('/', listLogsController);

export default router;
