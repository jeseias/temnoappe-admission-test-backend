import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should reconnect with mongo is down', async () => {
    let productsCollection = await sut.getCollection('products')
    expect(productsCollection).toBeTruthy()
    await sut.disconnect()
    productsCollection = await sut.getCollection('products')
    expect(productsCollection).toBeTruthy()
  })
})
