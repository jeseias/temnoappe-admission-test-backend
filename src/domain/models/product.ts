export enum ProductEnum {
  Id = 'id',
  Name = 'name',
  Image = 'image',
  Description = 'description'
}

export interface ProductModel {
  [ProductEnum.Id]: string
  [ProductEnum.Name]: string
  [ProductEnum.Image]: string
  [ProductEnum.Description]: string
}
