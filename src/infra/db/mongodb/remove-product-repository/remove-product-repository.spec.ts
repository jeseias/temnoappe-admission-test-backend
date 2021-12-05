import { Collection, Document } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { DeleteProductByIdMongoRepository } from './remove-product-repository'

let productCollection: Collection<Document>

describe('Remove Product Mongo Repository', () => {
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

  const makeSut = (): DeleteProductByIdMongoRepository => {
    return new DeleteProductByIdMongoRepository()
  }

  it('Should return undefined on success', async () => {
    const sut = makeSut()
    const result = await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    const product = await sut.delete(String(result.insertedId))
    const count = await productCollection.countDocuments()

    expect(product).toBeUndefined()
    expect(count).toBe(1)
  })
})
