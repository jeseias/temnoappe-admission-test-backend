import { DbAddProduct } from '../../data/protocols/usecases/db-add-product/db-add-product'
import { ProductMongoRepository } from '../../infra/db/mongodb/product-repository/product'
import { ProductController } from '../../presentation/controllers/product/product'

export const makeProductController = (): ProductController => {
  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  return new ProductController(dbAddProduct)
}
