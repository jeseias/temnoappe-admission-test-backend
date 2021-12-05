import { DeleteOneProduct } from '../../../domain/usecases/delete-one-product'
import { UpdateProduct } from '../../../domain/usecases/update-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class UpdateProductController implements Controller {
  constructor (
    private readonly updateProduct: UpdateProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { name, image, description } = httpRequest.body
      const product = await this.updateProduct.update({
        id,
        data: {
          name, image, description
        }
      })
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
