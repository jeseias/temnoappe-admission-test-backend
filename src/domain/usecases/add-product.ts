import { ProductEnum, ProductModel } from '../models/product'

export interface AddProductModel {
  [ProductEnum.Name]: string
  [ProductEnum.Image]: string
  [ProductEnum.Description]: string
}

export interface GetOneProductModel {
  [ProductEnum.Id]: any
}

export interface AddProduct {
  add (product: AddProductModel): Promise<ProductModel>
}
