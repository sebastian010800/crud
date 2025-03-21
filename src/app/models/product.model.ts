export class ProductModel {
  static REF = 'products';

  key: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  value: number;
  stock: number;
  type: string;
  constructor(
    key: string,
    createdAt: number,
    updatedAt: number,
    name: string,
    value: number,
    stock: number,
    type: string
  ) {
    this.key = key;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.value = value;
    this.stock = stock;
    this.type= type;
  }
}
