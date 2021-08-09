import fs from 'fs';
import { Report } from './models/report';

export interface UpdateCsv {
  update(datas: Report[]): void;
}

export class UpdateCsvAdapter implements UpdateCsv {
  update(data: Report[]): void {
    let dt = '';
    for (const datas of data) {
      dt += datas.id;
      dt += datas.commander;
      dt += ', ' + datas.departure;
      dt += ', ' + datas.passengers;
      dt += '\n';
    }
    const all = 'id, commander, departure, passengers \n' + dt;
    fs.writeFile('./report.csv', all, error => {
      if (error) {
        throw error;
      }
    });
  }
}
