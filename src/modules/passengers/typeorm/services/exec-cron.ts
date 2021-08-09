import { CronJob } from 'cron';
import { CallbackFunction } from 'ioredis';

export interface ExecCron {
  execute(funct: CallbackFunction, regex: string): void;
}

export class ExecCronAdapter {
  execute(funct: CallbackFunction, regex: string): void {
    const job = new CronJob(
      regex,
      () => {
        funct();
      },
      null,
      true,
      'America/Sao_Paulo',
    );
  }
}
