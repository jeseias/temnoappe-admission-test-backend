import { ProductModel } from '../models/product'
import { GetProductModel } from './add-product'

export interface GetProduct {
  get(productId: GetProductModel): Promise<ProductModel>
}
