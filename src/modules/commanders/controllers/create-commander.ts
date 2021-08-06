/* eslint-disable prettier/prettier */
import { Controller } from '@shared/controller';
import AppError from '@shared/errors/AppError';
import { ok } from '@shared/http/helper';
import { HttpRequest, HttpResponse } from '@shared/http/protocols/http';
import { CommanderEntity } from '../typeorm/entities/commander';
import { CreateCommanderService } from '../typeorm/services/create-commander';
import { CreateCommander } from '../usecases/create-commander';

export class CreateCommanderController implements Controller {
  constructor(private readonly createCommander: CreateCommander,
    private readonly createCommanderService: CreateCommanderService) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields = ["name", "email"]
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        throw new AppError(`Missing Param: ${field}`)
      }
    }
    const commander = this.createCommander.create(httpRequest.body.name, httpRequest.body.email)
    const commanderOk = this.createCommanderService.execute(commander)
    return ok({
      commander: commanderOk
    })
  }
}
