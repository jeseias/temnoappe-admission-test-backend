import { Collection, Document } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let productCollection: Collection<Document>

describe('Signup Routes', () => {
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

  it('Should return a product when added on success', async () => {
    await request(app)
      .post('/api/products')
      .send({
        name: 'any_name',
        image: 'any_image',
        description: 'any_description'
      })
      .expect(200)
  })

  it('Should return find an return a product on success', async () => {
    const result = await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    await request(app)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`/api/products/${result.insertedId}`)
      .expect(200)
  })
})
