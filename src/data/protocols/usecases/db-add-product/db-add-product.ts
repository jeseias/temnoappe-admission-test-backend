import { ProductModel } from '../../../../domain/models/product'
import { AddProduct, AddProductModel } from '../../../../domain/usecases/add-product'
import { AddProductRepository } from '../../db/add-product-repository'

export class DbAddProduct implements AddProduct {
  constructor (
    private readonly addProductRepository: AddProductRepository
  ) {}

  async add (productData: AddProductModel): Promise<ProductModel> {
    await this.addProductRepository.add(productData)
    return new Promise(resolve => resolve(null))
  }
}
