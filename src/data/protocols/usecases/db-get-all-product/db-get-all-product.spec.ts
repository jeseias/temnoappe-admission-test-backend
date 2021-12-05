import { ProductModel } from '../../../../domain/models/product'
import { LoadAllProductsRepository } from '../../db/load-all-products-repository'
import { DbGetAllProducts } from './db-get-all-product'

const makeLoadProductRepository = (): LoadAllProductsRepository => {
  class LoadAllProductsRepositoryStub implements LoadAllProductsRepository {
    async load (): Promise<ProductModel[]> {
      return new Promise(resolve => resolve(makeFakeProducts()))
    }
  }

  return new LoadAllProductsRepositoryStub()
}

const makeFakeProducts = (): ProductModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'valid_description'
}])

interface SutTypes {
  sut: DbGetAllProducts
  loadAllProductsRepository: LoadAllProductsRepository
}

const makeSut = (): SutTypes => {
  const loadAllProductsRepository = makeLoadProductRepository()
  const sut = new DbGetAllProducts(loadAllProductsRepository)

  return {
    sut,
    loadAllProductsRepository
  }
}

describe('DbGetAllProducts Usecase', () => {
  it('Should call LoadAllProductsRepository ', async () => {
    const { sut, loadAllProductsRepository } = makeSut()
    const loadSpy = jest.spyOn(loadAllProductsRepository, 'load')
    await sut.get()
    expect(loadSpy).toHaveBeenCalled()
  })

  it('Should throw if GetProductRepository throws', async () => {
    const { sut, loadAllProductsRepository } = makeSut()
    jest.spyOn(loadAllProductsRepository, 'load').mockRejectedValue(
      new Error()
    )
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })
})
