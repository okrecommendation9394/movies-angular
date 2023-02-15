import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractNames',
})
export class ExtractNamesPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value) {
      return value.split(', ').map((elem) => {
        return elem.split(' ')[0];
      });
    }
    return;
  }
}
