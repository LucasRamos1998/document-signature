import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByParamsRepository {
  load: (params: {}) => Promise<AccountModel>
}
