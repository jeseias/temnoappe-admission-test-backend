import { ProductModel } from '../../../../domain/models/product'
import { GetProductModel } from '../../../../domain/usecases/add-product'
import { GetProduct } from '../../../../domain/usecases/get-product'
import { GetProductRepository } from '../../db/get-product-repository'

export class DbGetProduct implements GetProduct {
  constructor (
    private readonly getProductRepository: GetProductRepository
  ) {}

  async get (productId: GetProductModel): Promise<ProductModel> {
    const { id } = productId
    const product = await this.getProductRepository.get({ id })
    return product
  }
}
