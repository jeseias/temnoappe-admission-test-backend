export interface DeleteProductByIdRepository {
  delete(id: string): Promise<void>
}
