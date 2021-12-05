import { ProductModel } from '../../../../domain/models/product'
import { GetOneProductModel } from '../../../../domain/usecases/add-product'
import { LoadProductByIdRepository } from '../../db/load-product-by-id-repository'
import { DbGetProduct } from './db-get-product'

const makeLoadProductByIdRepository = (): LoadProductByIdRepository => {
  class LoadProductByIdRepositoryStub implements LoadProductByIdRepository {
    async load (string: string): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }

  return new LoadProductByIdRepositoryStub()
}

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'valid_description'
})

const makeFakeGetProductPayload = (): GetOneProductModel => ({
  id: 'any_id'
})

interface SutTypes {
  sut: DbGetProduct
  loadProductByIdRepository: LoadProductByIdRepository
}

const makeSut = (): SutTypes => {
  const loadProductByIdRepository = makeLoadProductByIdRepository()
  const sut = new DbGetProduct(loadProductByIdRepository)

  return {
    sut,
    loadProductByIdRepository
  }
}

describe('DbGetProduct Usecase', () => {
  it('Should call GetProductRepository with correct values', async () => {
    const { sut, loadProductByIdRepository } = makeSut()
    const loadSpy = jest.spyOn(loadProductByIdRepository, 'load')
    await sut.get(makeFakeGetProductPayload())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if GetProductRepository throws', async () => {
    const { sut, loadProductByIdRepository } = makeSut()
    jest.spyOn(loadProductByIdRepository, 'load').mockRejectedValue(
      new Error()
    )
    const promise = sut.get(makeFakeGetProductPayload())
    await expect(promise).rejects.toThrow()
  })
})
