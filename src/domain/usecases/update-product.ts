import { ProductEnum, ProductModel } from '../models/product'

export interface UpdateProductModel {
  [ProductEnum.Id]: string
  data: {
    [ProductEnum.Name]: string
    [ProductEnum.Image]: string
    [ProductEnum.Description]: string
  }
}

export interface UpdateProduct {
  update(productData: UpdateProductModel): Promise<ProductModel>
}
