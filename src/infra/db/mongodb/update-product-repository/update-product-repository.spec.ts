import { Collection, Document } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { UpdateProductByIdMongoRepository } from './update-product-repository'

let productCollection: Collection<Document>

describe('Update Product Mongo Repository', () => {
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

  const makeSut = (): UpdateProductByIdMongoRepository => {
    return new UpdateProductByIdMongoRepository()
  }

  it('Should return a product on success', async () => {
    const sut = makeSut()
    const result = await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    const product = await sut.update({
      id: String(result.insertedId),
      data: {
        name: 'any_name2',
        image: 'any_image2',
        description: 'any_description2'
      }
    })

    expect(product).toBeTruthy()
    expect(product.id).toEqual(result.insertedId)
    expect(product.name).toEqual('any_name2')
    expect(product.image).toEqual('any_image2')
    expect(product.description).toEqual('any_description2')
  })
})
