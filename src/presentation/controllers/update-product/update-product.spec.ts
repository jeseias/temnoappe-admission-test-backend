import { ProductModel } from '../../../domain/models/product'
import { UpdateProduct, UpdateProductModel } from '../../../domain/usecases/update-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { UpdateProductController } from './update-product'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  },
  body: {
    name: 'any_name2',
    image: 'any_image2',
    description: 'any_description2'
  }
})

const makeUpdateProductProduct = (): UpdateProduct => {
  class UpdateProductStub implements UpdateProduct {
    async update (productData: UpdateProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }

  return new UpdateProductStub()
}

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name_2',
  image: 'any_image_2',
  description: 'any_description_2'
})

interface SutTypes {
  sut: UpdateProductController
  updateProductStub: UpdateProduct
}

const makeSut = (): SutTypes => {
  const updateProductStub = makeUpdateProductProduct()
  const sut = new UpdateProductController(updateProductStub)
  return {
    sut,
    updateProductStub
  }
}

describe('Update Product Controller', () => {
  it('Should call UpdateProduct with correct values', async () => {
    const { sut, updateProductStub } = makeSut()
    const updateSpy = jest.spyOn(updateProductStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      data: {
        name: 'any_name2',
        image: 'any_image2',
        description: 'any_description2'
      }
    })
  })

  it('Should return 200 with no product on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProduct()))
  })

  it('Should return 500 if UpdateProduct throws', async () => {
    const { sut, updateProductStub } = makeSut()
    jest.spyOn(updateProductStub, 'update').mockRejectedValueOnce(serverError(new Error('any_error')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
