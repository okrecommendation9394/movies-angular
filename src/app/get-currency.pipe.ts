import { Pipe, PipeTransform } from '@angular/core';
import { CountryInfo } from './movies.model';
@Pipe({
  name: 'getCurrency',
})
export class GetCurrencyPipe implements PipeTransform {
  transform(value: CountryInfo) {
    return Object.keys(value);
  }
}
