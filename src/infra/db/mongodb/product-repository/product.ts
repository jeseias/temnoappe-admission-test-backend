import { AddProductRepository } from '../../../../data/protocols/db/add-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { AddProductModel } from '../../../../domain/usecases/add-product'
import { map, MongoHelper } from '../helpers/mongo-helper'

export class ProductMongoRepository implements AddProductRepository {
  async add (accountData: AddProductModel): Promise<ProductModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })

    return map(account)
  }
}
