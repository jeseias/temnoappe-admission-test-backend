import { ProductModel } from '../../../domain/models/product'
import { AddProduct, AddProductModel } from '../../../domain/usecases/add-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { AddProductController } from './add-product'

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'any_description'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    image: 'any_image',
    description: 'any_description'
  }
})

const makeAddProduct = (): AddProduct => {
  class AddProductStub implements AddProduct {
    async add (product: AddProductModel): Promise<ProductModel> {
      return makeFakeProduct()
    }
  }

  return new AddProductStub()
}

interface SutTypes {
  sut: AddProductController
  addProductStub: AddProduct
}

const makeSut = (): SutTypes => {
  const addProductStub = makeAddProduct()
  const sut = new AddProductController(addProductStub)
  return {
    sut,
    addProductStub
  }
}

describe('AddProductController', () => {
  it('Should call AddProduct with correct values', async () => {
    const { sut, addProductStub } = makeSut()
    const addSpy = jest.spyOn(addProductStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
  })

  it('Should return 200 with product on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProduct()))
  })

  it('Should return 500 if AddProduct throws', async () => {
    const { sut, addProductStub } = makeSut()
    jest.spyOn(addProductStub, 'add').mockRejectedValueOnce(serverError(new Error('any_error')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
