import { ProductModel } from '../../../../domain/models/product'
import { UpdateProductModel } from '../../../../domain/usecases/update-product'
import { UpdateProductByIdRepository } from '../../db/update-product-by-id-repository'
import { DbUpdateProduct } from './db-update-product'

const makeUpdateProductByIdRepository = (): UpdateProductByIdRepository => {
  class UpdateProductByIdRepositoryStub implements UpdateProductByIdRepository {
    async update (productData: UpdateProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }

  return new UpdateProductByIdRepositoryStub()
}

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  image: 'any_image',
  description: 'valid_description'
})

const makeFakeGetProductPayload = (): UpdateProductModel => ({
  id: 'any_id',
  data: {
    name: 'any_name',
    image: 'any_image',
    description: 'valid_description'
  }
})

interface SutTypes {
  sut: DbUpdateProduct
  updateProductByIdRepository: UpdateProductByIdRepository
}

const makeSut = (): SutTypes => {
  const updateProductByIdRepository = makeUpdateProductByIdRepository()
  const sut = new DbUpdateProduct(updateProductByIdRepository)

  return {
    sut,
    updateProductByIdRepository
  }
}

describe('DbUpdateProduct Usecase', () => {
  it('Should call GetProductRepository with correct values', async () => {
    const { sut, updateProductByIdRepository } = makeSut()
    const loadSpy = jest.spyOn(updateProductByIdRepository, 'update')
    await sut.update(makeFakeGetProductPayload())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeGetProductPayload())
  })

  it('Should throw if GetProductRepository throws', async () => {
    const { sut, updateProductByIdRepository } = makeSut()
    jest.spyOn(updateProductByIdRepository, 'update').mockRejectedValue(
      new Error()
    )
    const promise = sut.update(makeFakeGetProductPayload())
    await expect(promise).rejects.toThrow()
  })
})
