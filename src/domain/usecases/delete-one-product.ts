export interface DeleteOneProduct {
  delete(id: string): Promise<void>
}
