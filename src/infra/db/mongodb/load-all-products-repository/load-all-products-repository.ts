import { LoadAllProductsRepository } from '../../../../data/protocols/db/load-all-products-repository'
import { ProductModel } from '../../../../domain/models/product'
import { map, MongoHelper } from '../helpers/mongo-helper'

export class LoadAllProductMongoRepository implements LoadAllProductsRepository {
  async load (): Promise<ProductModel[]> {
    const productCollection = await MongoHelper.getCollection('products')
    const products = await productCollection.find().toArray()
    return products.map(product => map(product))
  }
}
