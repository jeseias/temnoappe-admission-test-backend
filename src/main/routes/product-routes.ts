import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddProductController } from '../factories/products'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/products', adaptRoute(makeAddProductController()))
}
