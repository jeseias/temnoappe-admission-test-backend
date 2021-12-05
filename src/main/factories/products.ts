import { DbAddProduct } from '../../data/protocols/usecases/db-add-product/db-add-product'
import { DbRemoveOneProduct } from '../../data/protocols/usecases/db-delete-one-product/db-delete-one-product'
import { DbGetAllProducts } from '../../data/protocols/usecases/db-get-all-product/db-get-all-product'
import { DbGetProduct } from '../../data/protocols/usecases/db-get-product/db-get-product'
import { DbUpdateProduct } from '../../data/protocols/usecases/db-update-product/db-update-product'
import { AddProductMongoRepository } from '../../infra/db/mongodb/add-product-repository/add-product-repository'
import { LoadAllProductMongoRepository } from '../../infra/db/mongodb/load-all-products-repository/load-all-products-repository'
import { LoadProductByIdMongoRepository } from '../../infra/db/mongodb/load-product-by-id-repository/load-product-by-id-repository'
import { DeleteProductByIdMongoRepository } from '../../infra/db/mongodb/remove-product-repository/remove-product-repository'
import { UpdateProductByIdMongoRepository } from '../../infra/db/mongodb/update-product-repository/update-product-repository'
import { DeleteOneProductController } from '../../presentation/controllers/delete-product/delete-product'
import { AddProductController } from '../../presentation/controllers/product/add-product'
import { GetAllProductsController } from '../../presentation/controllers/product/get-all-products'
import { GetOneProductController } from '../../presentation/controllers/product/get-product'
import { UpdateProductController } from '../../presentation/controllers/update-product/update-product'
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

export const makeDeleteOneController = (): Controller => {
  const deleteOneProductMongoRepository = new DeleteProductByIdMongoRepository()
  const dbRemoveProduct = new DbRemoveOneProduct(deleteOneProductMongoRepository)
  return new DeleteOneProductController(dbRemoveProduct)
}

export const makeUpdateOneProductController = (): Controller => {
  const updateOneProductMongoRepository = new UpdateProductByIdMongoRepository()
  const dbRemoveProduct = new DbUpdateProduct(updateOneProductMongoRepository)
  return new UpdateProductController(dbRemoveProduct)
}
