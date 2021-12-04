import { ProductModel } from '../models/product'

export interface GetProduct {
  get(productId: string): Promise<ProductModel>
}
