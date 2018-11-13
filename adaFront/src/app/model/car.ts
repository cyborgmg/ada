import { Color } from './color';

export class Car {

  public static instance: Car = new Car(null, null, '', new Color(null, null), null, null, null);

  constructor(
      public id: number,
      public year: number,
      public brand: string,
      public color: Color,
      public price: number,
      public saleDate: Date,
      public status: string
  ) {}

}
