import { AccountModel } from '../../../../domain/models/account'

interface loadAccountByEmailOrCpf {
  cpf: string
  email: string
}

export interface LoadAccountByEmailOrCpf {
  load: (params: loadAccountByEmailOrCpf) => Promise<AccountModel>
}
