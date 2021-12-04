import { AddProduct } from '../../../domain/usecases/add-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'

export class AddProductController implements Controller {
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
