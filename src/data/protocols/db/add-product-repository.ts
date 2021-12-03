import { ProductModel } from '../../../domain/models/product'
import { AddProductModel } from '../../../domain/usecases/add-product'

export interface AddProductRepository {
  add (productData: AddProductModel): Promise<ProductModel>
}
