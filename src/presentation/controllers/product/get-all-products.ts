import { GetAllProducts } from '../../../domain/usecases/get-all-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpResponse } from '../../protocols'

export class GetAllProductsController implements Controller {
  constructor (
    private readonly getAllProducts: GetAllProducts
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const product = await this.getAllProducts.get()
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
