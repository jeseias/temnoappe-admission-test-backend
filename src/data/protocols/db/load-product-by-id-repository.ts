import { ProductModel } from '../../../domain/models/product'

export interface LoadProductByIdRepository {
  load (id: string): Promise<ProductModel>
}
