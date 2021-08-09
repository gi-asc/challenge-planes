import { FindPassengersByPlaneIdService } from '@modules/passengers/typeorm/services/find-passengers-by-plane-id';
import { FindPlaneByDepartureService } from '@modules/planes/services/find-plane-by-departure';
import { PlaneRepositoryAdapter } from '@modules/planes/services/find-plane-repository';
import { GenerateFile } from '@modules/reports/fs/generate-file';
import { SendMail } from '@modules/reports/fs/services/send-mail';
import { UpdateCsvAdapter } from '@modules/reports/fs/update-csv';
import { CronJob } from 'cron';

const job = (): void => {
  new CronJob(
    '0 8 * * * *',
    async () => {
      const generate = new GenerateFile(
        new FindPlaneByDepartureService(new PlaneRepositoryAdapter()),
        new FindPassengersByPlaneIdService(),
        new UpdateCsvAdapter(),
      );

      const send = new SendMail(generate);

      await send.send();
    },
    null,
    true,
    'America/Sao_Paulo',
  );
};

export default job;
