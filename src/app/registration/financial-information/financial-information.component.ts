import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { ValidationHelper } from 'src/app/shared/util/validationhelper';
import { FinanaceModel } from './finance.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financial-information',
  templateUrl: './financial-information.component.html',
  styleUrls: ['./financial-information.component.scss']
})
export class FinancialInformationComponent {
  financeForm: FormGroup;
  finanaceModel: FinanaceModel
  formBuilder: any;

  constructor(
    private stepperService: StepperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }
  // registerForm: FormGroup;

  // createRegistartionFormGroup() {
  //   this.registerForm = this.fb.group({
  //     nric: [
  //       '',
  //       [ValidationHelper.onlySpaceValidator, ValidationHelper.required],
  //     ],
  //   });
  // }

  ngOnInit() {
    this.finanaceModel = new FinanaceModel('', '', '', '', '', '', '', ''); // Initialize the user model with default values
    this.financeForm = this.fb.group({
      employer: [this.finanaceModel.employer, Validators.required],
      address: [this.finanaceModel.address, Validators.required],
      employementSector: [this.finanaceModel.employementSector, Validators.required],
      monthlyIncome: [this.finanaceModel.monthlyIncome, Validators.required],
      usResident: [this.finanaceModel.usResident, Validators.required],
      selectCountry: [this.finanaceModel.selectCountry, Validators.required],
      taxPayer: [this.finanaceModel.taxPayer, Validators.required],
      tinAvailable: [this.finanaceModel.tinAvailable, Validators.required],
    });
  }

  next(): void {
    this.stepperService.next(11);
  }

  onSubmit() {
    console.log(this.financeForm.value);
    this.finanaceModel = this.financeForm.value;
    if (this.financeForm.valid) {
      
      console.log(this.finanaceModel);
      this.next();
    } else {
      this.markFormGroupAsTouched(this.financeForm);
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
