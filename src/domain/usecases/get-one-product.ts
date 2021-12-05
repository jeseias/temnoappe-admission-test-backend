import { ProductModel } from '../models/product'
import { GetOneProductModel } from './add-product'

export interface GetOneProduct {
  get(productId: GetOneProductModel): Promise<ProductModel>
}
