import { DbAddProduct } from '../../data/protocols/usecases/db-add-product/db-add-product'
import { DbGetAllProducts } from '../../data/protocols/usecases/db-get-all-product/db-get-all-product'
import { DbGetProduct } from '../../data/protocols/usecases/db-get-product/db-get-product'
import { AddProductMongoRepository } from '../../infra/db/mongodb/add-product-repository/add-product-repository'
import { LoadAllProductMongoRepository } from '../../infra/db/mongodb/load-all-products-repository/load-all-products-repository'
import { LoadProductByIdMongoRepository } from '../../infra/db/mongodb/load-product-by-id-repository/load-product-by-id-repository'
import { AddProductController } from '../../presentation/controllers/product/add-product'
import { GetAllProductsController } from '../../presentation/controllers/product/get-all-products'
import { GetOneProductController } from '../../presentation/controllers/product/get-product'
import { Controller } from '../../presentation/protocols'

export const makeAddProductController = (): Controller => {
  const addProductMongoRepository = new AddProductMongoRepository()
  const dbAddProduct = new DbAddProduct(addProductMongoRepository)
  return new AddProductController(dbAddProduct)
}

export const makeGetOneProductController = (): Controller => {
  const loadProductByIdMongoRepository = new LoadProductByIdMongoRepository()
  const dbGetProduct = new DbGetProduct(loadProductByIdMongoRepository)
  return new GetOneProductController(dbGetProduct)
}

export const makeGetAllProductsController = (): Controller => {
  const loadAllProductsMongoRepository = new LoadAllProductMongoRepository()
  const dbGetAllProducts = new DbGetAllProducts(loadAllProductsMongoRepository)
  return new GetAllProductsController(dbGetAllProducts)
}
