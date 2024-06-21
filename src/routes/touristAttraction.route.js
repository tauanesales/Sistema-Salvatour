import touristAttractionController from '../controller/touristAttraction.controller.js';
import express from 'express';
import cors from 'cors';
import { validToken } from '../middlewares/jwt.token.middleware.js';
import { validId } from "../middlewares/global.middlewares.js";
import multer from 'multer';


const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

const route = express.Router();
route.get('/all', validToken, touristAttractionController.getAttractions);
route.patch('/:id', validToken, validId, touristAttractionController.updateAttraction);
route.delete('/:id', validToken, validId, touristAttractionController.deleteAttraction);
route.post('/create', validToken, upload.single('image'), touristAttractionController.addAttraction);

export default route;
