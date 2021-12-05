import { DeleteOneProduct } from '../../../domain/usecases/delete-one-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class DeleteOneProductController implements Controller {
  constructor (
    private readonly deleteOneProduct: DeleteOneProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.deleteOneProduct.delete(id)
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
