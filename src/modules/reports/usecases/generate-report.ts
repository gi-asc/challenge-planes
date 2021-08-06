/* eslint-disable prettier/prettier */
import { FindPassengersByPlaneIdService } from '@modules/passengers/typeorm/services/find-passengers-by-plane-id';
import { FindPlaneById } from '@modules/planes/services/find-plane-by-id';
import { Route } from '@modules/routes/models/route';
import { FindRouteById } from '@modules/routes/typeorm/services/find-route-by-id';
import AppError from '@shared/errors/AppError';
import { Report } from '../models/report';

export class GenerateReportAdapter {
  constructor(
    private readonly findPassengersByPlaneId: FindPassengersByPlaneIdService,
    private readonly findPlaneById: FindPlaneById,
    private readonly findRouteById: FindRouteById
  ) { }
  async generate(plane_id: number): Promise<Report> {
    const passengers = await this.findPassengersByPlaneId.execute(plane_id);
    if (passengers.length == 0) {
      throw new AppError("no passengers found")
    }
    const plane = await this.findPlaneById.find(plane_id)
    if (!plane || plane == undefined) {
      throw new AppError("no plane found")
    }
    const route = await this.findRouteById.find(plane.route_id) as Route
    if (!route || route == undefined) {
      throw new AppError("no route found")
    }
    return {
      commander: plane.commander,
      route: route,
      departure: plane.departure_time,
      passengers: passengers
    }
  }
}
