/* eslint-disable prettier/prettier */
import { DbCommanderRepository } from '@modules/commanders/typeorm/repository/commander-repository';
import { FindPassengersByPlaneIdService } from '@modules/passengers/typeorm/services/find-passengers-by-plane-id';
import { FindPlaneByDepartureService } from '@modules/planes/services/find-plane-by-departure';
import { PlaneRepositoryAdapter } from '@modules/planes/services/find-plane-repository';
import { ReportEmail } from '@modules/reports/email';
import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import { GenerateFile } from '../generate-file';
import { UpdateCsvAdapter } from '../update-csv';

export class SendMail {
  constructor(
    private readonly generateFile: GenerateFile,
  ) { }
  async send(): Promise<void> {
    const repository = getCustomRepository(DbCommanderRepository)
    const commanders = await repository.find({
      select: ['email']
    })

    const mails = commanders.map(commander => commander.email)

    const reportEmail = new ReportEmail(mails, 'report.csv', 'report.csv')
    const dep_init = moment().format()
    const dep_final = moment().add('28', 'hours').format()
    await this.generateFile.generate(dep_init, dep_final)
    return await reportEmail.sendEmail(reportEmail.mailOptions)
  }
}
