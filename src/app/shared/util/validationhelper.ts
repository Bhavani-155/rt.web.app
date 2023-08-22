import { FormControl, Validators } from "@angular/forms";

export class ValidationHelper  extends Validators
{

    static onlySpaceValidator(control: FormControl): { [key: string]: any } {
        var len = control?.value?.length;
        // console.log( { len } );
        if (len && control.value.trim() == "") {
            return { invalidOnlySpace: true, name: "error" };
        }
    
        return {};
      }

      static currencyValidator(control: FormControl): { [key: string]: any } {
        var currencyRegexp = /^(\d+\.)?\d+$/;
        if (control.value && !currencyRegexp.test(control.value)) {
            return { invalidCurrency: true, name: "error" };
        }
        return {};
      }
    
      static currencyValidatorNegative(control: FormControl): { [key: string]: any } {
        var currencyRegexp = /^-?(\d+\.)?\d+$/;
        if (control.value && !currencyRegexp.test(control.value)) {
            return { invalidCurrencyNegative: true, name: "error" };
        }
        return {};
      }

      static twoDigitDecimalValidator(control: FormControl): { [key: string]: any } {
        var currencyRegexp = /^\d{0,18}(\.\d{0,2})?$/;
        if (control.value && !currencyRegexp.test(control.value)) {
            return { invalidTwoDecimal: true, name: "error" };
        }
        return {};
      }

      static emailValidator(control: FormControl): { [key: string]: any } {
        var emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        let error = {};
        if(control.value === null || control.value === '' ){
          return error;
        }
        control.value.split(',').forEach(email => {
          if(!emailRegexp.test(email)) {
            error = {invalidEmail: true, email: "error" };
          }
          });
        return error;
    
      }
}