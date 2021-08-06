/* eslint-disable prettier/prettier */

import { getCustomRepository } from "typeorm";
import { RouteEntity } from "../entities/route";
import { DbRouteRepository } from "../repository/route-repository";

export interface FindRouteById {
  find(id: number): Promise<RouteEntity | undefined>;
}

export class FindRouteByIdAdapter implements FindRouteById {
  async find(id: number): Promise<RouteEntity | undefined> {
    const repository = getCustomRepository(DbRouteRepository)
    const route = await repository.findOne(id)
    return route
  }
}
