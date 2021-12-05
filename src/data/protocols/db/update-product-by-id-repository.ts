import { ProductModel } from '../../../domain/models/product'
import { UpdateProductModel } from '../../../domain/usecases/update-product'

export interface UpdateProductByIdRepository {
  update(productData: UpdateProductModel): Promise<ProductModel>
}
