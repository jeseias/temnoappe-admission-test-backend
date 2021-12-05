import { ObjectId } from 'mongodb'
import { LoadProductByIdRepository } from '../../../../data/protocols/db/load-product-by-id-repository'
import { ProductModel } from '../../../../domain/models/product'
import { map, MongoHelper } from '../helpers/mongo-helper'

export class LoadProductByIdMongoRepository implements LoadProductByIdRepository {
  async load (id: string): Promise<ProductModel> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ _id: new ObjectId(id) })
    return map(product)
  }
}
