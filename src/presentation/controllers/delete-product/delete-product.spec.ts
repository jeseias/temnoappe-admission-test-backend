import { DeleteOneProduct } from '../../../domain/usecases/delete-one-product'
import { ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { DeleteOneProductController } from './delete-product'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

const makeDeleteOneProduct = (): DeleteOneProduct => {
  class DeleteOneProductStub implements DeleteOneProduct {
    async delete (id: string): Promise<void> {

    }
  }

  return new DeleteOneProductStub()
}

interface SutTypes {
  sut: DeleteOneProductController
  deleteOneProductStub: DeleteOneProduct
}

const makeSut = (): SutTypes => {
  const deleteOneProductStub = makeDeleteOneProduct()
  const sut = new DeleteOneProductController(deleteOneProductStub)
  return {
    sut,
    deleteOneProductStub
  }
}

describe('Delete Product Controller', () => {
  it('Should call DeleteOneProduct with correct values', async () => {
    const { sut, deleteOneProductStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteOneProductStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return 200 with no product on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({}))
  })

  it('Should return 500 if GetProductRepository throws', async () => {
    const { sut, deleteOneProductStub } = makeSut()
    jest.spyOn(deleteOneProductStub, 'delete').mockRejectedValueOnce(serverError(new Error('any_error')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
