import { AddProduct } from '../../../domain/usecases/add-product'
import { ok } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ProductController {
  constructor (
    private readonly addProduct: AddProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, image, description } = httpRequest.body
    const account = await this.addProduct.add({
      name,
      image,
      description
    })
    return ok(account)
  }
}
