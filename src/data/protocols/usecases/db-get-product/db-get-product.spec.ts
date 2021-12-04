import { ProductModel } from '../../../../domain/models/product'
import { GetProductModel } from '../../../../domain/usecases/add-product'
import { GetProductRepository } from '../../db/get-product-repository'
import { DbGetProduct } from './db-get-product'

const makeGetProductRepository = (): GetProductRepository => {
  class GetProductRepositoryStub implements GetProductRepository {
    async get (productId: GetProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }

  return new GetProductRepositoryStub()
}

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'valid_description'
})

const makeFakeGetProductPayload = (): GetProductModel => ({
  id: 'any_id'
})

interface SutTypes {
  sut: DbGetProduct
  getProductRepositoryStub: GetProductRepository
}

const makeSut = (): SutTypes => {
  const getProductRepositoryStub = makeGetProductRepository()
  const sut = new DbGetProduct(getProductRepositoryStub)

  return {
    sut,
    getProductRepositoryStub
  }
}

describe('DbGetProduct Usecase', () => {
  it('Should call GetProductRepository with correct values', async () => {
    const { sut, getProductRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getProductRepositoryStub, 'get')
    await sut.get(makeFakeGetProductPayload())
    expect(getSpy).toHaveBeenCalledWith({ id: 'any_id' })
  })

  it('Should throw if GetProductRepository throws', async () => {
    const { sut, getProductRepositoryStub } = makeSut()
    jest.spyOn(getProductRepositoryStub, 'get').mockRejectedValue(
      new Error()
    )
    const promise = sut.get(makeFakeGetProductPayload())
    await expect(promise).rejects.toThrow()
  })
})
