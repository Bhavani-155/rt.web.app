import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { RegularityInfoModel } from './regularity-info.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-regularity-info',
  templateUrl: './regularity-info.component.html',
  styleUrls: ['./regularity-info.component.scss']
})
export class RegularityInfoComponent implements OnInit {
  regularityForm: FormGroup;
  regularityInfoModel: RegularityInfoModel;
  formBuilder: any;
  constructor(
    private stepperService : StepperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ){}
  ngOnInit() {
    this.regularityInfoModel = new RegularityInfoModel('', '', '', '',  ); // Initialize the user model with default values
    this.regularityForm = this.fb.group({
      business: [this.regularityInfoModel.business, Validators.required],
      finra: [this.regularityInfoModel.finra, Validators.required],
      politically: [this.regularityInfoModel.politically, Validators.required],
      tradedCompany: [this.regularityInfoModel.tradedCompany, Validators.required],
    });
  }
  next()
  {
    this.stepperService.next(16);
  }
  onSubmit() {
  if (this.regularityForm.valid) {
    console.log(this.regularityForm.value);
    this.regularityInfoModel = this.regularityForm.value;
    console.log(this.regularityInfoModel);
    this.next();
  }else {
    this.markFormGroupAsTouched(this.regularityForm);
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
