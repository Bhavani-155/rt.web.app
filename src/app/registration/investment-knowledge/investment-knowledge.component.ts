import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { InvestmentModel } from './investment.model';
import { ActivatedRoute } from '@angular/router';
import { ValidationHelper } from 'src/app/shared/util/validationhelper';

@Component({
  selector: 'app-investment-knowledge',
  templateUrl: './investment-knowledge.component.html',
  styleUrls: ['./investment-knowledge.component.scss']
})
export class InvestmentKnowledgeComponent {
  investmentForm: FormGroup;
  investmentModel: InvestmentModel
  formBuilder: any;
  constructor
  (private stepperService : StepperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ){}
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
      this.investmentModel = new InvestmentModel('', '', '', '', '', '', ); // Initialize the user model with default values
      this.investmentForm = this.fb.group({
        degree: [this.investmentModel.degree, Validators.required],
        qualification: [this.investmentModel.qualification, Validators.required],
        investmentProducts: [this.investmentModel.investmentProducts, Validators.required],
        sgxOnline: [this.investmentModel.sgxOnline, Validators.required],
        previousScore: [this.investmentModel.previousScore, Validators.required],
        financialInstitutions: [this.investmentModel.financialInstitutions, Validators.required],
      });
    }
    
  next()
  {
    this.stepperService.next(12);
  }
  onSubmit() {
    if (this.investmentForm.valid) {
      console.log(this.investmentForm.value);
      this.investmentModel = this.investmentForm.value;
      console.log(this.investmentModel);
      this.next();
    }else {
      this.markFormGroupAsTouched(this.investmentForm);
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
