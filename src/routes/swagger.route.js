import swaggerUi from 'swagger-ui-express';
import {Router} from 'express';
import swaggerDocument from '../swagger.json' assert{ type: "json"};

const router = Router();
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;