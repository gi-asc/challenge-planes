import { CreateCoupleController } from '@modules/passengers/controllers/create-couple';
import { DbPassengerRepository } from '@modules/passengers/typeorm/repository/db-passenger-repository';
import { CreatePassengerService } from '@modules/passengers/typeorm/services/create-passenger';
import { CreatePassportService } from '@modules/passports/services/create-passport-service';
import { DbPassportRepository } from '@modules/passports/typeorm/repository/db-passport-repository';
import { CreatePassportFactory } from '@modules/passports/usecases/create-passport';
import {
  BirthDateValidatorAdapter,
  CpfValidatorAdapter,
  NationalityValidatorAdapter,
  PassportValidatorAdapter,
  VisaValidatorAdapter,
} from '@modules/passports/validators';
import { ChangePlaneAdapter } from '@modules/planes/services/change-plane';
import { FindPlaneForRouteIdAdapter } from '@modules/planes/services/find-plane-by-route-id';
import { FindPlaneRepositoryAdapter } from '@modules/planes/services/find-plane-repository';
import { FindRouteByRedis } from '@modules/routes/redis/find-route-by-redis';
import { Controller } from '@shared/controller';
import RedisModel from '@shared/redis/redis-model';

export const makeCreateCouple = (): Controller => {
  const cpfValidator = new CpfValidatorAdapter();
  const birthDateValidator = new BirthDateValidatorAdapter();
  const visaValidator = new VisaValidatorAdapter();
  const nationalityValidator = new NationalityValidatorAdapter();
  const passportValidator = new PassportValidatorAdapter(
    cpfValidator,
    birthDateValidator,
    visaValidator,
    nationalityValidator,
  );
  const createPassport = new CreatePassportFactory(passportValidator);
  const passportRepository = new DbPassportRepository();
  const createPassportService = new CreatePassportService();

  const passengerRepository = new DbPassengerRepository();
  const createPassengerService = new CreatePassengerService(
    passengerRepository,
    passportRepository,
  );

  const redisModel = RedisModel;
  const findRoute = new FindRouteByRedis(redisModel);

  const findPlaneRepository = new FindPlaneRepositoryAdapter();
  const findPlaneByRouteId = new FindPlaneForRouteIdAdapter(
    findPlaneRepository,
  );
  const changePlane = new ChangePlaneAdapter(
    findRoute,
    findPlaneByRouteId,
    passengerRepository,
  );

  return new CreateCoupleController(
    createPassportService,
    createPassengerService,
    changePlane,
    createPassport,
  );
};
