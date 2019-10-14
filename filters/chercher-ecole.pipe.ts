import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chercherEcole'
})
export class ChercherEcolePipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (term == null) {
      return value;
    }
    return value.filter (hero => hero.nomE.includes(term));
  }

}
