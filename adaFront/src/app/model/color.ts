export class Color {

  public static instance: Color = new Color(null, null);

  constructor(
      public id: number,
      public nome: string
  ) {

  }
}
