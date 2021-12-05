import { ObjectId } from 'mongodb'
import { DeleteProductByIdRepository } from '../../../../data/protocols/db/delete-product-by-id-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteProductByIdMongoRepository implements DeleteProductByIdRepository {
  async delete (id: string): Promise<void> {
    console.log(id)
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteOne({ _id: new ObjectId(id) })
  }
}
