import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { DeclarationModel } from './declaration.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent {
  declarationForm: FormGroup;
  declarationModel: DeclarationModel
  formBuilder: any;
  constructor(
    private stepperService : StepperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ){}
    ngOnInit() {
      this.declarationModel = new DeclarationModel('', '', '', '', '', '', ); // Initialize the user model with default values
      this.declarationForm = this.fb.group({
        fatcaDeclaration: [this.declarationModel.fatcaDeclaration, Validators.required],
        pepDeclaration: [this.declarationModel.pepDeclaration, Validators.required],
        usTax: [this.declarationModel.usTax, Validators.required],
        disclosure: [this.declarationModel.disclosure, Validators.required],
        foreign: [this.declarationModel.foreign, Validators.required],
        termsConditions: [this.declarationModel.termsConditions, Validators.required],
      });
    }
  next()
  {
    this.stepperService.next(14);
  }
  onSubmit() {
    if (this.declarationForm.valid) {
      console.log(this.declarationForm.value);
      this.declarationModel = this.declarationForm.value;
      console.log(this.declarationModel);
      this.next();
    }else {
      this.markFormGroupAsTouched(this.declarationForm);
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
