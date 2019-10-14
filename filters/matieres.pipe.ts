import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matieres'
})
export class MatieresPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (term == null) {
      return value;
    }
    return value.filter (hero => hero.nomMatiere.includes(term));
  }


}
