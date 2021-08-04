import { PlaneEntity } from '../typeorm/entities/plane';
export interface FindPlaneRepository {
  findForRoute(routeId: number): Promise<PlaneEntity[]>;
}
