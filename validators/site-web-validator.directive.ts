import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[siteWeb]',
  providers: [{provide: NG_VALIDATORS, useExisting: siteWebValidatorDirective, multi: true}]
})
export class siteWebValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {

    const isValidSiteWeb = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}$/.test(c.value);
    const message = {
      'siteWeb': {
        'message': 'Le site Web doit être valide '
      }
    };
return isValidSiteWeb ? null : message;
  }
}
