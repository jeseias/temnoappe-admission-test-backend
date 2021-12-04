import { ProductModel } from '../../../domain/models/product'
import { GetProduct } from '../../../domain/usecases/get-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { GetProductController } from './get-product'

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'any_description'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'any_id'
  }
})

const makeGetProduct = (): GetProduct => {
  class GetProductStub implements GetProduct {
    async get (productId: string): Promise<ProductModel> {
      return makeFakeProduct()
    }
  }

  return new GetProductStub()
}

interface SutTypes {
  sut: GetProductController
  getProductStub: GetProduct
}

const makeSut = (): SutTypes => {
  const getProductStub = makeGetProduct()
  const sut = new GetProductController(getProductStub)
  return {
    sut,
    getProductStub
  }
}

describe('GetProductController', () => {
  it('Should call GetProduct with correct values', async () => {
    const { sut, getProductStub } = makeSut()
    const addSpy = jest.spyOn(getProductStub, 'get')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return 200 with product on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProduct()))
  })

  it('Should return 500 if GetProduct throws', async () => {
    const { sut, getProductStub } = makeSut()
    jest.spyOn(getProductStub, 'get').mockRejectedValueOnce(serverError(new Error('any_error')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
