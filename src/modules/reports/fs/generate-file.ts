/* eslint-disable prettier/prettier */
import { FindPassengersByPlaneIdService } from '@modules/passengers/typeorm/services/find-passengers-by-plane-id';
import { FindPlaneByDeparture } from '@modules/planes/services/find-plane-by-departure';
import AppError from '@shared/errors/AppError';
import { Report } from './models/report';
import { UpdateCsv } from './update-csv';

export class GenerateFile {
  constructor(
    private readonly findPlaneByDeparture: FindPlaneByDeparture,
    private readonly findPassengersByPlaneId: FindPassengersByPlaneIdService,
    private readonly updateFile: UpdateCsv,
  ) { }
  async generate(departure_init: string, departure_final: string): Promise<void> {
    const planes = await this.findPlaneByDeparture.execute(departure_init, departure_final)
    if (planes?.length === 0 || planes === undefined) {
      throw new AppError('planes not found', 404)
    }
    const reports: Array<Report> | null = []
    for (const plane of planes) {
      const passengers = await this.findPassengersByPlaneId.execute(plane.id)
      const ids = passengers.map(passenger => passenger.id)
      const report: Report = {
        id: plane.id,
        commander: plane.commander,
        departure: plane.departure_time,
        passengers: ids
      }
      reports.push(report)
    }
    return this.updateFile.update(reports)
  }
}
