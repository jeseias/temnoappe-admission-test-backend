import { ProductModel } from '../../../domain/models/product'
import { AddProduct, AddProductModel } from '../../../domain/usecases/add-product'
import { HttpRequest } from '../../protocols/http'
import { ProductController } from './product'

const makeFakeProductModel = (): ProductModel => ({
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
      return makeFakeProductModel()
    }
  }

  return new AddProductStub()
}

interface SutTypes {
  sut: ProductController
  addProductStub: AddProduct
}

const makeSut = (): SutTypes => {
  const addProductStub = makeAddProduct()
  const sut = new ProductController(addProductStub)
  return {
    sut,
    addProductStub
  }
}

describe('Product Controller', () => {
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
})
