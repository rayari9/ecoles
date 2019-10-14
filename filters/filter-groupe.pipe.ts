import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGroupe'
})
export class FilterGroupePipe implements PipeTransform {

  transform(value: any, term: any): any {
    if (!term) {
      return value;
    }else{
    return value.filter (hero => hero.nomG.includes(term));
  }
  }
}
