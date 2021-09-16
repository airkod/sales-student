export enum EProduct {
  Course = 'course',
  Product = 'product',
}

export class IHistory {
  bonus?: number;
  dateTime?: number;
  product?: EProduct;
  data?: string
}
