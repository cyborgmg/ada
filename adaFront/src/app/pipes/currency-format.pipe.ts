import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';


@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(value: number, locale: string, currency_symbol: boolean, number_format: string = '1.2-2'): string {
        if (value) {
          const currencyPipe = new CurrencyPipe('pt-BR');
          return currencyPipe.transform(value, locale, currency_symbol, number_format);
        }
    }
}
