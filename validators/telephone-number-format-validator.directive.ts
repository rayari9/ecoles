import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[telephoneNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: TelephoneNumberFormatValidatorDirective, multi: true}]
})
export class TelephoneNumberFormatValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^[0-9-+s()]*$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'Le numero de téléphone doit être valide'
      }
    };
    return isValidPhoneNumber ? null : message;
  }
}
