import { PassengerEntity } from '@modules/passengers/typeorm/entities/passenger';
import { Route } from '@modules/routes/models/route';

export interface Report {
  commander: string;
  route: Route;
  departure: Date;
  passengers: PassengerEntity[];
}
