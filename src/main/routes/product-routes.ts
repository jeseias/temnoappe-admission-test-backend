/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddProductController, makeGetAllProductsController, makeGetOneProductController } from '../factories/products'

export default (router: Router): void => {
  router.post('/products', adaptRoute(makeAddProductController()))
  router.get('/products/:id', adaptRoute(makeGetOneProductController()))
  router.get('/products', adaptRoute(makeGetAllProductsController()))
}
