import { AddProduct } from '../../../domain/usecases/add-product'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ProductController {
  constructor (
    private readonly addProduct: AddProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, image, description } = httpRequest.body
    await this.addProduct.add({
      name,
      image,
      description
    })
    return new Promise(resolve => resolve(null))
  }
}
