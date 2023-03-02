import { Router } from 'express';
import StarshipController from '../controllers/StarshipController.js';

const routes = Router();

const starshipController = new StarshipController();
routes.get('/starships', starshipController.list);

export default routes;
