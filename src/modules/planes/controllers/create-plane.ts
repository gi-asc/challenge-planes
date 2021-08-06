/* eslint-disable prettier/prettier */
import { Controller } from '@shared/controller';
import AppError from '@shared/errors/AppError';
import { ok } from '@shared/http/helper';
import { HttpRequest, HttpResponse } from '@shared/http/protocols/http';
import { DeepPartial } from 'typeorm';
import { Plane } from '../models/plane';
import { CreatePlane } from '../services/create-plane';
import { CommanderValidator } from '../validators/commander-validator';
import { DepartureTimeValidator } from '../validators/departure-time-validator';
import { RouteValidator } from '../validators/route-validator';

export class CreatePlaneController implements Controller {
  constructor(
    private readonly departureTimeValidator: DepartureTimeValidator,
    private readonly routeValidator: RouteValidator,
    private readonly createPlane: CreatePlane,
    private readonly commanderValidator: CommanderValidator
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const plane = httpRequest.body;
    const fields = ['commander', 'router_id', 'departure_time'];

    for (const field of fields) {
      if (!plane[field]) {
        throw new AppError(`Missing Param: ${field}`);
      }
    }
    const { router_id, departure_time, commander } = httpRequest.body

    if (!this.departureTimeValidator.isValid(departure_time)) {
      throw new AppError('Invalid departure time')
    }

    if (!this.routeValidator.isValid(router_id)) {
      throw new AppError('Invalid route')
    }

    if (!this.commanderValidator.isValid(commander)) {
      throw new AppError('Invalid commander')

    }
    const route: number = router_id;
    const commanderExist: string = plane.commander;
    const departure: Date = new Date(departure_time)

    const planeOk: DeepPartial<Plane> = {
      commander: commanderExist,
      route_id: route,
      departure_time: departure
    }

    const newPlane = await this.createPlane.createPlane(planeOk)

    return ok({
      plane: newPlane
    })
  }
}
