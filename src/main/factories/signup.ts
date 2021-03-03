import { SignupController } from '../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPostgresRepository } from '../../infra/db/account/account-postgres-repository'
import { EmailValidatorAdapter } from '../../infra/validators/email-validator-adapter'

export const makeSignUpController = (): SignupController => {
  const salt = 12
  const dbAddAccount = new DbAddAccount(new BcryptAdapter(salt), new AccountPostgresRepository(), new AccountPostgresRepository())
  const emailValidator = new EmailValidatorAdapter()
  return new SignupController(dbAddAccount, emailValidator)
}
