import { DbRouteRepository } from '@modules/routes/typeorm/repository/route-repository';
import { Validator } from '@shared/usecases/validator';
import { getCustomRepository } from 'typeorm';

export interface RouteValidator extends Validator {
  routeExists(route_id: number): boolean;
}

export class RouteValidatorAdapter implements Validator {
  routeExists(route_id: number): boolean {
    const repository = getCustomRepository(DbRouteRepository);
    const exists = repository.findById(route_id);
    if (exists == undefined) {
      return false;
    }
    return true;
  }

  isValid(route_id: number): boolean {
    return this.routeExists(route_id);
  }
}
