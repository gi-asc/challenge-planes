import { ExternConsultAdapter } from '@modules/passengers/controllers/axios/axios';
import { UpdateStartPointController } from '@modules/passengers/controllers/update-start-point';
import { ExecCronAdapter } from '@modules/passengers/typeorm/services/exec-cron';
import { UpdateStartPointService } from '@modules/passengers/typeorm/services/update-start-point';
import { Controller } from '@shared/controller';

export const makeUpdateStartPoint = (): Controller => {
  const updateService = new UpdateStartPointService();
  const externConsult = new ExternConsultAdapter();
  const execCron = new ExecCronAdapter();
  return new UpdateStartPointController(updateService, externConsult, execCron);
};
