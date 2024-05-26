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
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const currentServerUrl = `${protocol}://${host}`;

    apiSpec.servers = [
    {
        url: currentServerUrl,
        description: "Servidor Atual"
    },
    ...apiSpec.servers
    ];

    res.json(apiSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(null, options));


export default router;
