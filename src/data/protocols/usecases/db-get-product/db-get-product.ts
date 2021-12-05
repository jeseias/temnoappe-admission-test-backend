import { ProductModel } from '../../../../domain/models/product'
import { GetOneProductModel } from '../../../../domain/usecases/add-product'
import { GetOneProduct } from '../../../../domain/usecases/get-one-product'
import { LoadProductByIdRepository } from '../../db/load-product-by-id-repository'

export class DbGetProduct implements GetOneProduct {
  constructor (
    private readonly loadProductByIdRepository: LoadProductByIdRepository
  ) {}

  async get (productId: GetOneProductModel): Promise<ProductModel> {
    const { id } = productId
    const product = await this.loadProductByIdRepository.load(id)
    return product
  }
}
