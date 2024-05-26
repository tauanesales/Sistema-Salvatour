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
router.get('/swagger.json', (req, res) => {
    const dynamicApiSpec = { ...apiSpec };
    const protocol = req.protocol;
    const host = req.get('host');

    const dynamicServer = dynamicApiSpec.servers.find(server => server.url.includes('{protocol}://{host}'));
    if (dynamicServer) {
        dynamicServer.url = `${protocol}://${host}`;
    }

    res.json(dynamicApiSpec);
});
router.use('/', swaggerUi.serve, swaggerUi.setup(null, options));


export default router;
