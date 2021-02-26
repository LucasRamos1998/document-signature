import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByEmailOrCpfParams {
  cpf: string
  email: string
}

export interface LoadAccountByEmailOrCpf {
  load: (params: LoadAccountByEmailOrCpfParams) => Promise<AccountModel>
}
