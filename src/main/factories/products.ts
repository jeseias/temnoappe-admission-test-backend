import { DbAddProduct } from '../../data/protocols/usecases/db-add-product/db-add-product'
import { DbGetProduct } from '../../data/protocols/usecases/db-get-product/db-get-product'
import { AddProductMongoRepository } from '../../infra/db/mongodb/add-product-repository/add-product-repository'
import { GetProductMongoRepository } from '../../infra/db/mongodb/get-product-repository/get-product-repository'
import { AddProductController } from '../../presentation/controllers/product/add-product'
import { GetProductController } from '../../presentation/controllers/product/get-product'
import { Controller } from '../../presentation/protocols'

export const makeAddProductController = (): Controller => {
  const addProductMongoRepository = new AddProductMongoRepository()
  const dbAddProduct = new DbAddProduct(addProductMongoRepository)
  return new AddProductController(dbAddProduct)
}

export const makeGetProductController = (): Controller => {
  const getProductMongoRepository = new GetProductMongoRepository()
  const dbGetProduct = new DbGetProduct(getProductMongoRepository)
  return new GetProductController(dbGetProduct)
}
