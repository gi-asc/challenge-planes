import { CreateCommanderController } from '@modules/commanders/controllers/create-commander';
import { CreateCommanderService } from '@modules/commanders/typeorm/services/create-commander';
import { CreateCommanderAdapter } from '@modules/commanders/usecases/create-commander';
import { EmailValidatorAdapter } from '@modules/commanders/validators/email-validator';
import { Controller } from '@shared/controller';

export const makeCreateCommander = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();
  const createCommander = new CreateCommanderAdapter(emailValidator);
  const createCommanderService = new CreateCommanderService();

  return new CreateCommanderController(createCommander, createCommanderService);
};
