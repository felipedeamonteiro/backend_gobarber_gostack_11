/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providerRouter = Router();
const providersController = new ProvidersController();

providerRouter.use(ensureAutheticated);

providerRouter.get('/', providersController.index);

export default providerRouter;
