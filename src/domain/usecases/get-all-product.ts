import { ProductModel } from '../models/product'

export interface GetAllProducts {
  get(): Promise<ProductModel[]>
}
