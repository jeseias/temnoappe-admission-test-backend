import { ProductModel } from '../../../../domain/models/product'
import { UpdateProduct, UpdateProductModel } from '../../../../domain/usecases/update-product'
import { UpdateProductByIdRepository } from '../../db/update-product-by-id-repository'

export class DbUpdateProduct implements UpdateProduct {
  constructor (
    private readonly updateProductByIdRepository: UpdateProductByIdRepository
  ) {}

  async update (productData: UpdateProductModel): Promise<ProductModel> {
    const { id, data } = productData
    const product = await this.updateProductByIdRepository.update({
      id,
      data
    })
    return product
  }
}
