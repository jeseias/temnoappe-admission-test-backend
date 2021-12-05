import { GetProduct } from '../../../domain/usecases/get-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class GetProductController implements Controller {
  constructor (
    private readonly getProduct: GetProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const product = await this.getProduct.get({ id })
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
