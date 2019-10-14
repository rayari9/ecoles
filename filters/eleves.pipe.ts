import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eleves'
})
export class ElevesPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (term == null) {
      return value;
    }
    return value.filter (hero => hero.nom.includes(term));
  }

}
