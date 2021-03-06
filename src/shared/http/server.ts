import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/AppError'
import '@shared/typeorm';
import job from './mail-cron';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(400).json({
      status: 'error',
      message: error.message,
    });
    next();
  },
);

app.listen(3334, () => {
  job();
});
