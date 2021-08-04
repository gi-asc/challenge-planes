import { Location } from '@shared/location';

export interface Passenger {
  id: string;
  plane_id: number;
  spouse_id?: string;
  startPoint: Location;
  destiny: Location;
}
