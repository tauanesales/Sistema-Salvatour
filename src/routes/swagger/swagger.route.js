import swaggerUi from 'swagger-ui-express';
import {Router} from 'express';
import swaggerJsDocOptions from './swagger.js';
import swaggerJsDoc from 'swagger-jsdoc';

const router = Router();


const options = {
    swaggerOptions: {
        url: "/docs/swagger.json"
    },
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-init.js"
    
    ]
}

const apiSpec = swaggerJsDoc(swaggerJsDocOptions);
router.get('/swagger.json', (_req, res) => res.json(apiSpec));
router.use('/', swaggerUi.serve, swaggerUi.setup(null, options));


export default router;