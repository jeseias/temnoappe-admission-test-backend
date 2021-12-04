import { ProductModel } from '../../../domain/models/product'
import { GetProductModel } from '../../../domain/usecases/add-product'

export interface GetProductRepository {
  get (productId: GetProductModel): Promise<ProductModel>
}
