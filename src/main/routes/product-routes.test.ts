import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Signup Routes', () => {
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

  it('Should return a product on success', async () => {
    await request(app)
      .post('/api/products')
      .send({
        name: 'any_name',
        image: 'any_image',
        description: 'any_description'
      })
      .expect(200)
  })
})
