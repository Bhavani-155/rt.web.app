import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { BankDetailsModel } from './bank-details.model';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  bankDetailsModel: BankDetailsModel;
  bankDetailsForm: FormGroup;
  constructor(
    private stepperService: StepperService,
    public fb : FormBuilder
  ){

  }
  ngOnInit(){
   this.bankDetailsModel = new BankDetailsModel('','','');
   this.bankDetailsForm = this.fb.group(
    {
      bankName:[this.bankDetailsModel.bankName,Validators.required],
      accountName:[this.bankDetailsModel.accountName,Validators.required],
      accountNumber:[this.bankDetailsModel.accountNumber,Validators.required]
    }
   )
  }

  next() {
    this.stepperService.next(15);
  }
  onSubmit() {
    if (this.bankDetailsForm.valid) {
      // console.log(this.bankDetailsForm.value);
      this.bankDetailsModel = this.bankDetailsForm.value;
      // console.log(this.signupModel);
      this.next();
    } else {
      this.markFormGroupAsTouched(this.bankDetailsForm);
      // this.focusOnInvalidField();
    }
  }
  
  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
