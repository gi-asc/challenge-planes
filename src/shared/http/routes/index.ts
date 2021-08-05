import { controllerAdapter } from '@shared/adapters/http';
import { makeCreateCouple } from '@shared/factories/create-couple-controller';
import { makeCreatePassenger } from '@shared/factories/create-passenger-controller-factory';
import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello dev!',
  });
});

routes.post('/createPassenger', controllerAdapter(makeCreatePassenger()));
routes.post('/createCouple', controllerAdapter(makeCreateCouple()));
export default routes;
