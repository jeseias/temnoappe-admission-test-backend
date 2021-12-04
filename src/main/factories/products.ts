import { DbAddProduct } from '../../data/protocols/usecases/db-add-product/db-add-product'
import { ProductMongoRepository } from '../../infra/db/mongodb/product-repository/product'
import { AddProductController } from '../../presentation/controllers/product/add-product'
import { Controller } from '../../presentation/protocols'

export const makeAddProductController = (): Controller => {
  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  return new AddProductController(dbAddProduct)
}
