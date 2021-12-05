import { ProductModel } from '../../../domain/models/product'
import { GetOneProductModel } from '../../../domain/usecases/add-product'
import { GetOneProduct } from '../../../domain/usecases/get-one-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { GetOneProductController } from './get-product'

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'any_description'
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

const makeGetOneProduct = (): GetOneProduct => {
  class GetOneProductStub implements GetOneProduct {
    async get (productId: GetOneProductModel): Promise<ProductModel> {
      return makeFakeProduct()
    }
  }

  return new GetOneProductStub()
}

interface SutTypes {
  sut: GetOneProductController
  getOneProductStub: GetOneProduct
}

const makeSut = (): SutTypes => {
  const getOneProductStub = makeGetOneProduct()
  const sut = new GetOneProductController(getOneProductStub)
  return {
    sut,
    getOneProductStub
  }
}

describe('GetProductController', () => {
  it('Should call GetOneProduct with correct values', async () => {
    const { sut, getOneProductStub } = makeSut()
    const addSpy = jest.spyOn(getOneProductStub, 'get')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({ id: 'any_id' })
  })

  it('Should return 200 with product on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProduct()))
  })

  it('Should return 500 if GetProductRepository throws', async () => {
    const { sut, getOneProductStub } = makeSut()
    jest.spyOn(getOneProductStub, 'get').mockRejectedValueOnce(serverError(new Error('any_error')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
