import { ProductModel } from '../../../../domain/models/product'
import { AddProductModel } from '../../../../domain/usecases/add-product'
import { AddProductRepository } from '../../db/add-product-repository'
import { DbAddProduct } from './db-add-product'

const makeAddProductRepository = (): AddProductRepository => {
  class AddProductRepositoryStub implements AddProductRepository {
    async add (productData: AddProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }

  return new AddProductRepositoryStub()
}

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'valid_description'
})

const makeFakeProductData = (): AddProductModel => ({
  name: 'any_name',
  image: 'any_image',
  description: 'any_description'
})

interface SutTypes {
  sut: DbAddProduct
  addProductRepositoryStub: AddProductRepository
}

const makeSut = (): SutTypes => {
  const addProductRepositoryStub = makeAddProductRepository()
  const sut = new DbAddProduct(addProductRepositoryStub)

  return {
    sut,
    addProductRepositoryStub
  }
}

describe('DbAddProduct Usecase', () => {
  it('Should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addProductRepositoryStub, 'add')
    await sut.add(makeFakeProductData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
  })
})
