import { ObjectId } from 'mongodb'
import { UpdateProductByIdRepository } from '../../../../data/protocols/db/update-product-by-id-repository'
import { ProductModel } from '../../../../domain/models/product'
import { UpdateProductModel } from '../../../../domain/usecases/update-product'
import { map, MongoHelper } from '../helpers/mongo-helper'

export class UpdateProductByIdMongoRepository implements UpdateProductByIdRepository {
  async update ({ id, data }: UpdateProductModel): Promise<ProductModel> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } }, {
      upsert: true,
      returnDocument: 'after'
    })
    return map(product.value)
  }
}
