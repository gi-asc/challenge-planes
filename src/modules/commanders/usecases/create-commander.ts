/* eslint-disable prettier/prettier */
import AppError from '@shared/errors/AppError';
import { Commander } from '../models/commander';
import { EmailValidator } from '../validators/email-validator';

export interface CreateCommander {
  create(name: string, email: string): Commander;
}

export class CreateCommanderAdapter {
  constructor(private readonly emailValidator: EmailValidator) { }

  create(name: string, email: string): Commander {
    const validation = this.emailValidator.isValid(email)
    if (!validation) {
      throw new AppError("invalid email")
    }
    return {
      name: name,
      email: email
    }
  }
}
