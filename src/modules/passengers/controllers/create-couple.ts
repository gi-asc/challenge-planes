/* eslint-disable prettier/prettier */
import { CreatePassportService } from '@modules/passports/services/create-passport-service';
import { CreatePassport } from '@modules/passports/usecases/create-passport';
import { ChangePlane } from '@modules/planes/services/change-plane';
import { Controller } from '@shared/controller';
import { ok } from '@shared/http/helper';
import { HttpRequest, HttpResponse } from '@shared/http/protocols/http';
import { Location } from '@shared/location';
import { CreatePassengerService } from '../typeorm/services/create-passenger';

export class CreateCoupleController implements Controller {
  constructor(
    private readonly createPassportService: CreatePassportService,
    private readonly createPassengerService: CreatePassengerService,
    private readonly changePlane: ChangePlane,
    private readonly createPassport: CreatePassport
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const pass1 = this.createPassport.generate(httpRequest.body.passports[0])
    const pass2 = this.createPassport.generate(httpRequest.body.passports[1])
    const passport1 = await this.createPassportService.execute(
      pass1
    );
    const passport2 = await this.createPassportService.execute(
      pass2
    );
    const plane = await this.changePlane.findForPlane(
      httpRequest.body.startPoint,
      httpRequest.body.destiny,
      2,
    );
    const passenger1 = await this.createPassengerService.execute(
      passport1.cpf,
      plane.id,
      httpRequest.body.startPoint as Location,
      httpRequest.body.destiny as Location,
      pass2.cpf
    );
    const passenger2 = await this.createPassengerService.execute(
      passport2.cpf,
      plane.id,
      httpRequest.body.startPoint as Location,
      httpRequest.body.destiny as Location,
      pass1.cpf
    );
    return ok({
      passengers: [passenger1, passenger2],
      passports: [passport1, passport2],
      plane: plane
    });
  }
}
