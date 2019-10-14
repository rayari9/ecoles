import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ecolesName'
})
export class EcolesNamePipe implements PipeTransform{

  transform(value: any, term: string): any {
    if (term == null) {
      return value;
    }
    return value.filter (hero => hero.nomE.includes(term));
  }

}
