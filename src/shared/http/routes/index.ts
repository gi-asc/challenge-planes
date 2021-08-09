import { controllerAdapter } from '@shared/adapters/http';
import { makeCreateCommander } from '@shared/factories/create-commander-controller';
import { makeCreateCouple } from '@shared/factories/create-couple-controller';
import { makeCreatePassenger } from '@shared/factories/create-passenger-controller-factory';
import { makeCreatePlane } from '@shared/factories/create-plane-controller';
import { makeUpdateStartPoint } from '@shared/factories/update-start-point-controller';
import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello dev!',
  });
});

routes.post('/passenger', controllerAdapter(makeCreatePassenger()));
routes.post('/couple', controllerAdapter(makeCreateCouple()));
routes.post('/plane', controllerAdapter(makeCreatePlane()));
routes.post('/commander', controllerAdapter(makeCreateCommander()));
routes.put('/startPoint', controllerAdapter(makeUpdateStartPoint()));
export default routes;
