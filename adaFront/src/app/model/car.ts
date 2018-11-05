export class Car {

  public static instance: Car = new Car('', null, '', null, null, null);

  constructor(
      public vin: string,
      public year: number,
      public brand: string,
      public color: number,
      public price: number,
      public saleDate: Date
  ) {

  }
}
