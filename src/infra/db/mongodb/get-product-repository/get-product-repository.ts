import { GetProductRepository } from '../../../../data/protocols/db/get-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { GetProductModel } from '../../../../domain/usecases/add-product'
import { map, MongoHelper } from '../helpers/mongo-helper'

export class GetProductMongoRepository implements GetProductRepository {
  async get (productId: GetProductModel): Promise<ProductModel> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ _id: productId.id })
    return map(product)
  }
}
