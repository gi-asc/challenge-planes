import { FindPassengersByPlaneIdService } from '@modules/passengers/typeorm/services/find-passengers-by-plane-id';
import { FindPlaneByDepartureService } from '@modules/planes/services/find-plane-by-departure';
import { PlaneRepositoryAdapter } from '@modules/planes/services/find-plane-repository';
import { GenerateFile } from '@modules/reports/fs/generate-file';
import { SendMail } from '@modules/reports/fs/services/send-mail';
import { UpdateCsvAdapter } from '@modules/reports/fs/update-csv';
import { controllerAdapter } from '@shared/adapters/http';
import { makeCreateCommander } from '@shared/factories/create-commander-controller';
import { makeCreateCouple } from '@shared/factories/create-couple-controller';
import { makeCreatePassenger } from '@shared/factories/create-passenger-controller-factory';
import { makeCreatePlane } from '@shared/factories/create-plane-controller';
import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello dev!',
  });
});

routes.post('/createPassenger', controllerAdapter(makeCreatePassenger()));
routes.post('/createCouple', controllerAdapter(makeCreateCouple()));
routes.post('/createPlane', controllerAdapter(makeCreatePlane()));
routes.post('/createCommander', controllerAdapter(makeCreateCommander()));
export default routes;
