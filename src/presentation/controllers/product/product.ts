import { AddProduct } from '../../../domain/usecases/add-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ProductController {
  constructor (
    private readonly addProduct: AddProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, image, description } = httpRequest.body
      const product = await this.addProduct.add({
        name,
        image,
        description
      })
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
