import { AddProductRepository } from '../../../../data/protocols/db/add-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { AddProductModel } from '../../../../domain/usecases/add-product'
import { map, MongoHelper } from '../helpers/mongo-helper'

export class AddProductMongoRepository implements AddProductRepository {
  async add (productData: AddProductModel): Promise<ProductModel> {
    const productCollection = await MongoHelper.getCollection('products')
    const result = await productCollection.insertOne(productData)
    const product = await productCollection.findOne({ _id: result.insertedId })

    return map(product)
  }
}
