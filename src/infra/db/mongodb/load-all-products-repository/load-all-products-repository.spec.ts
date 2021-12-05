import { Collection, Document } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAllProductMongoRepository } from './load-all-products-repository'

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

  const makeSut = (): LoadAllProductMongoRepository => {
    return new LoadAllProductMongoRepository()
  }

  it('Should return a product on success', async () => {
    const sut = makeSut()
    await productCollection.insertMany([{
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    }, {
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    }])
    const products = await sut.load()

    expect(products).toBeTruthy()
    expect(products).toHaveLength(2)

    expect(products[0].id).toBeTruthy()
    expect(products[0].name).toBeTruthy()
    expect(products[0].image).toBeTruthy()
    expect(products[0].description).toBeTruthy()
  })
})
