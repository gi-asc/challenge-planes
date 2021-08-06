import { CreatePlaneController } from '@modules/planes/controllers/create-plane';
import { CreatePlaneAdapter } from '@modules/planes/services/create-plane';
import { CommanderValidatorAdapter } from '@modules/planes/validators/commander-validator';
import { DepartureTimeValidatorAdapter } from '@modules/planes/validators/departure-time-validator';
import { RouteValidatorAdapter } from '@modules/planes/validators/route-validator';
import { Controller } from '@shared/controller';

export const makeCreatePlane = (): Controller => {
  const routeValidator = new RouteValidatorAdapter();
  const departureTimeValidator = new DepartureTimeValidatorAdapter();
  const createPlane = new CreatePlaneAdapter();
  const commanderValidator = new CommanderValidatorAdapter();

  return new CreatePlaneController(
    departureTimeValidator,
    routeValidator,
    createPlane,
    commanderValidator,
  );
};
