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

  it('Should find and return all products on success', async () => {
    await request(app)
      .get('/api/products')
      .expect(200)
  })

  it('Should find an return a single product on success', async () => {
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

  it('Should find a single product and delete on success', async () => {
    const result = await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    await request(app)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .delete(`/api/products/${result.insertedId}`)
      .expect(200)
  })

  it('Should find a single product and update on success', async () => {
    const result = await productCollection.insertOne({
      name: 'any_name',
      image: 'any_image',
      description: 'any_description'
    })
    await request(app)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .patch(`/api/products/${result.insertedId}`)
      .send({
        name: 'any_name2',
        image: 'any_image2',
        description: 'any_description2'
      })
      .expect(200)
  })
})
