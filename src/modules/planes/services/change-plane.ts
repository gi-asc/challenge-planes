/* eslint-disable prettier/prettier */
import { FindRoute } from '@modules/routes/usecases/find-route';
import { Route } from '@modules/routes/models/route';
import { Location } from '@shared/location';
import { Plane } from '@modules/planes/models/plane';
import { FindPlaneForRouteId } from './find-plane-by-route-id';
import AppError from '@shared/errors/AppError';
import { PassengerRepository } from '@modules/passengers/usecases/passenger-repository';
import { getCustomRepository } from 'typeorm';
import { DbPassengerRepository } from '@modules/passengers/typeorm/repository/db-passenger-repository';

export interface ChangePlane {
  change(route: Route): Promise<Plane[]>;
  findForPlane(
    startPoint: Location,
    destiny: Location,
    numPassengers: number,
  ): Promise<Plane>;
}

export class ChangePlaneAdapter implements ChangePlane {
  constructor(
    private readonly findRoute: FindRoute,
    private readonly findPlaneByRouteId: FindPlaneForRouteId,
    private readonly passengerRepository: PassengerRepository,
  ) { }

  async findForPlane(
    startPoint: Location,
    destiny: Location,
    numPassengers = 1,
  ): Promise<Plane> {
    const passRep = getCustomRepository(DbPassengerRepository)
    const route = await this.findRoute.find(startPoint, destiny);
    if (route === null) {
      throw new Error('route not found');
    }
    const planes = await this.change(route);
    let planeOk: Plane | null;
    planeOk = null;
    for (let i = 0; i < planes.length; i++) {
      const passengers = await passRep.findByPlane(
        planes[i].id,
      );
      if (passengers.length + numPassengers <= 8) {
        planeOk = planes[i];
        break;
      }
    }
    if (planeOk === null) {
      throw new AppError('no free plane found');
    }
    return planeOk;
  }

  async change(route: Route): Promise<Plane[]> {
    const plane = await this.findPlaneByRouteId.find(route.id);
    return plane;
  }
}
