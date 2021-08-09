import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { CronJob } from 'cron';
import { FindPlaneByDepartureService } from '@modules/planes/services/find-plane-by-departure';
import { FindPassengersByPlaneIdService } from '@modules/passengers/typeorm/services/find-passengers-by-plane-id';
import { PlaneRepositoryAdapter } from '@modules/planes/services/find-plane-repository';
import { GenerateFile } from '@modules/reports/fs/generate-file';
import { SendMail } from '@modules/reports/fs/services/send-mail';
import { UpdateCsvAdapter } from '@modules/reports/fs/update-csv';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const job = new CronJob(
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

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error.stack);
    return response.status(400).json({
      status: 'error',
      message: error.message,
    });
  },
);

app.listen(3334, () => {
  console.log('server started on port 3334!');
});
