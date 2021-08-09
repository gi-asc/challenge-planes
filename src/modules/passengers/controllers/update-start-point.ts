/* eslint-disable prettier/prettier */
import { Controller } from '@shared/controller';
import { HttpRequest, HttpResponse } from '@shared/http/protocols/http';
import { ExecCron } from '../typeorm/services/exec-cron';
import { UpdateStartPointService } from '../typeorm/services/update-start-point';
import { ExternConsult } from './axios/axios';

export class UpdateStartPointController implements Controller {
  constructor(
    private readonly updateStartPoint: UpdateStartPointService,
    private readonly externConsult: ExternConsult,
    private readonly execCron: ExecCron,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const newCity = httpRequest.body.city;
    const isValid = await this.externConsult.consult(
      newCity,
      'http://mockbin.org/bin/9367c3b0-6a8b-4004-961d-4fcab813ed8a',
      '7a173dea-e591-11eb-ba80-0242ac130004',
    );
    if (!isValid) {
      return {
        statusCode: 403,
      };
    }
    this.execCron.execute(
      () =>
        this.updateStartPoint.execute(
          httpRequest.body.city,
          httpRequest.body.newCity,
        ),
      '1 * * * *',
    );

    return {
      statusCode: 200,
    };
  }
}
