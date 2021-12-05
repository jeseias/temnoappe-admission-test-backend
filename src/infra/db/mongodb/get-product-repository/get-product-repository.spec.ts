import { Collection, Document } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { GetProductMongoRepository } from './get-product-repository'

let productCollection: Collection<Document>

describe('Product Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  const makeSut = (): GetProductMongoRepository => {
    return new GetProductMongoRepository()
  }

  it('Should return a product on success', async () => {
    const sut = makeSut()
    const result = await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    const product = await sut.get({
      id: result.insertedId
    })

    expect(product).toBeTruthy()
    expect(product.id).toBeTruthy()
    expect(product.name).toBe('any_name')
    expect(product.image).toBe('any_image')
    expect(product.description).toBe('any_description')
  })
})
