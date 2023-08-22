import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { CustomerModel } from './customer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-account-review',
  templateUrl: './customer-account-review.component.html',
  styleUrls: ['./customer-account-review.component.scss']
})
export class CustomerAccountReviewComponent {
  customerForm: FormGroup;
  customerModel: CustomerModel
  formBuilder: any;
  constructor(
    private stepperService : StepperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ){}
  ngOnInit() {
    this.customerModel = new CustomerModel('', '', '', '', '', '', '', '' ); // Initialize the user model with default values
    this.customerForm = this.fb.group({
      investmentObjective: [this.customerModel.investmentObjective, Validators.required],
      shareHolder: [this.customerModel.shareHolder, Validators.required],
      singaporeBrokerage: [this.customerModel.singaporeBrokerage, Validators.required],
      specifiedInvestment: [this.customerModel.specifiedInvestment, Validators.required],
      higherQualification: [this.customerModel.higherQualification, Validators.required],
      financeQualification: [this.customerModel.financeQualification, Validators.required],
      workingExperience: [this.customerModel.workingExperience, Validators.required],
      educationProgram: [this.customerModel.educationProgram, Validators.required],
    });
  }
  next()
  {
    this.stepperService.next(13);
  }
  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.customerModel = this.customerForm.value;
      console.log(this.customerModel);
      this.next();
    }else {
      this.markFormGroupAsTouched(this.customerForm);
    }
  }
  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
