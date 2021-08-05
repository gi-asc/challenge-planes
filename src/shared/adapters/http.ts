/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller } from '@shared/controller';
import { Request, Response } from 'express';

export const controllerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
