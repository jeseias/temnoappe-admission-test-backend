import { GetOneProduct } from '../../../domain/usecases/get-one-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class GetOneProductController implements Controller {
  constructor (
    private readonly getOneProduct: GetOneProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const product = await this.getOneProduct.get({ id })
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
