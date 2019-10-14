import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parents'
})
export class ParentsPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (term == null) {
      return value;
    }
    return value.filter (hero => hero.nomP.includes(term));
  }

}
