import { ProductModel } from '../../../domain/models/product'

export interface LoadAllProductsRepository {
  load(): Promise<ProductModel[]>
}
