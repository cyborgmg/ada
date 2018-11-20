import { Color } from './color';

export class Car {

  constructor(
      public id: number,
      public year: number,
      public brand: string,
      public color: Color,
      public price: number,
      public saleDate: Date,
      public status: string
  ) {}

  public static getInstance(): Car {
    return new Car(null, null, null, null, null, null, null);
  }

}
