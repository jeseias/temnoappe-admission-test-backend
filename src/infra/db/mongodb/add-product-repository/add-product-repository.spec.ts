import { MongoHelper } from '../helpers/mongo-helper'
import { ProductMongoRepository } from './add-product-repository'

describe('Product Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  const makeSut = (): ProductMongoRepository => {
    return new ProductMongoRepository()
  }

  it('Should return a product on success', async () => {
    const sut = makeSut()
    const product = await sut.add({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })

    expect(product).toBeTruthy()
    expect(product.id).toBeTruthy()
    expect(product.name).toBe('any_name')
    expect(product.image).toBe('any_image')
    expect(product.description).toBe('any_description')
  })
})
