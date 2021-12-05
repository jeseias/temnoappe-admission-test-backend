import { ProductModel } from '../../../../domain/models/product'
import { GetAllProducts } from '../../../../domain/usecases/get-all-product'
import { LoadAllProductsRepository } from '../../db/load-all-products-repository'

export class DbGetAllProducts implements GetAllProducts {
  constructor (
    private readonly LoadAllProductsRepository: LoadAllProductsRepository
  ) {}

  async get (): Promise<ProductModel[]> {
    const products = await this.LoadAllProductsRepository.load()
    return products
  }
}
