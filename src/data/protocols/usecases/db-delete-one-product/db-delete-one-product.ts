import { ProductModel } from '../../../../domain/models/product'
import { GetOneProductModel } from '../../../../domain/usecases/add-product'
import { DeleteOneProduct } from '../../../../domain/usecases/delete-one-product'
import { DeleteProductByIdRepository } from '../../db/delete-product-by-id-repository'

export class DbRemoveOneProduct implements DeleteOneProduct {
  constructor (
    private readonly deleteProductByIdRepository: DeleteProductByIdRepository
  ) {}

  async delete (id: string): Promise<void> {
    await this.deleteProductByIdRepository.delete(id)
  }
}
