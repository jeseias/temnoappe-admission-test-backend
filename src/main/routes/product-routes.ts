import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeProductController } from '../factories/products'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/products', adaptRoute(makeProductController()))
}
