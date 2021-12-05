import { DeleteProductByIdRepository } from '../../db/delete-product-by-id-repository'
import { DbRemoveOneProduct } from './db-delete-one-product'

const makeDeleteOneProductByIdRepository = (): DeleteProductByIdRepository => {
  class DeleteOneProductByIdRepositoryStub implements DeleteProductByIdRepository {
    async delete (id: string): Promise<void> {
    }
  }

  return new DeleteOneProductByIdRepositoryStub()
}

interface SutTypes {
  sut: DbRemoveOneProduct
  deleteOneProductByIdRepository: DeleteProductByIdRepository
}

const makeSut = (): SutTypes => {
  const deleteOneProductByIdRepository = makeDeleteOneProductByIdRepository()
  const sut = new DbRemoveOneProduct(deleteOneProductByIdRepository)

  return {
    sut,
    deleteOneProductByIdRepository
  }
}

describe('DbDeleteProduct Usecase', () => {
  it('Should call DeleteOneProductRepository with correct values', async () => {
    const { sut, deleteOneProductByIdRepository } = makeSut()
    const deleteSpy = jest.spyOn(deleteOneProductByIdRepository, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if DeleteOneProductRepository throws', async () => {
    const { sut, deleteOneProductByIdRepository } = makeSut()
    jest.spyOn(deleteOneProductByIdRepository, 'delete').mockRejectedValue(
      new Error()
    )
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})
