/* eslint-disable prettier/prettier */
import { CreatePassportService } from '@modules/passports/services/create-passport-service';
import { CreatePassport } from '@modules/passports/usecases/create-passport';
import { ChangePlane } from '@modules/planes/services/change-plane';
import { Controller } from '@shared/controller';
import { ok } from '@shared/http/helper';
import { HttpRequest, HttpResponse } from '@shared/http/protocols/http';
import { Location } from '@shared/location';
import { CreatePassengerService } from '../typeorm/services/create-passenger';

export class CreatePassengerController implements Controller {
  constructor(
    private readonly createPassportService: CreatePassportService,
    private readonly createPassengerService: CreatePassengerService,
    private readonly changePlane: ChangePlane,
    private readonly createPassport: CreatePassport
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const pass = this.createPassport.generate(httpRequest.body.passport)
    const passport = await this.createPassportService.execute(
      pass
    );
    const plane = await this.changePlane.findForPlane(
      httpRequest.body.startPoint,
      httpRequest.body.destiny,
      1,
    );
    const passenger = await this.createPassengerService.execute(
      passport.cpf,
      plane.id,
      httpRequest.body.startPoint as Location,
      httpRequest.body.destiny as Location,
    );
    return ok({
      passenger: passenger,
      passport: passport,
      plane: plane
    });
  }
}
