import { PgHelper } from '../infra/db/type-orm/postgresql/helpers/postgres-helper'
import 'dotenv/config'

PgHelper.connect().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(5050, () => console.log('Server running at 5050'))
}).catch(err => console.log(err))
