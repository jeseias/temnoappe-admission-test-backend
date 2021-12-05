import { ProductModel } from '../../../domain/models/product'
import { GetAllProducts } from '../../../domain/usecases/get-all-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { GetAllProductsController } from './get-all-products'

const makeFakeProduct = (): ProductModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'any_description'
}])

const makeGetAllProducts = (): GetAllProducts => {
  class GetAllProductsStub implements GetAllProducts {
    async get (): Promise<ProductModel[]> {
      return makeFakeProduct()
    }
  }

  return new GetAllProductsStub()
}

interface SutTypes {
  sut: GetAllProductsController
  getAllProductsStub: GetAllProducts
}

const makeSut = (): SutTypes => {
  const getAllProductsStub = makeGetAllProducts()
  const sut = new GetAllProductsController(getAllProductsStub)
  return {
    sut,
    getAllProductsStub
  }
}

describe('Get All Products Controller', () => {
  it('Should call GetAllProducts', async () => {
    const { sut, getAllProductsStub } = makeSut()
    const getSpy = jest.spyOn(getAllProductsStub, 'get')
    await sut.handle()
    expect(getSpy).toHaveBeenCalled()
  })

  it('Should return 200 with product on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeProduct()))
  })

  it('Should return 500 if GetProductRepository throws', async () => {
    const { sut, getAllProductsStub } = makeSut()
    jest.spyOn(getAllProductsStub, 'get').mockRejectedValueOnce(serverError(new Error('any_error')))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
