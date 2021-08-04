import { Location } from '@shared/location';
import { Route } from '../models/route';

export interface FindRoute {
  find(startPoint: Location, destiny: Location): Promise<Route>;
}
