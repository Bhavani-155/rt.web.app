import { Component } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';
import {
  Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute,
} from '@angular/router';
import { ApiServices } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';
import { PersonalInfoModel } from './personalInfo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  constructor(
    private stepperService: StepperService,
    private route: ActivatedRoute,
    private apiServices: ApiServices,
    private utilityService: UtilityService,
    private fb: FormBuilder,
  ) { }
  authCodeForPersonAPI: any;
  personData: any = [];
  formValues: any = {};
  personalInfo: PersonalInfoModel;
  formBuilder: any;
  showSpouseInfo: boolean = false;
  personalInfoForm: FormGroup;
  options = [{ id: 1, name: 'Single' }, { id: 2, name: 'Married' }]
  ngOnInit(): void {
    this.personalInfo = new PersonalInfoModel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''); // Initialize the user model with default values
    this.personalInfoForm = this.fb.group({
      title: [this.personalInfo.title, Validators.required],
      firstName: [this.personalInfo.firstName, Validators.required],
      familyName: [this.personalInfo.familyName, Validators.required],
      dateOfBirth: [this.personalInfo.dateOfBirth, Validators.required],
      gender: [this.personalInfo.gender, Validators.required],
      idDocNo: [this.personalInfo.idDocNo, Validators.required],
      dateOfExpiry: [this.personalInfo.dateOfExpiry, Validators.required],
      mobile: [this.personalInfo.mobile, Validators.required],
      email: [this.personalInfo.email, [Validators.required, Validators.email]],
      maritalStatus: [this.personalInfo.maritalStatus, Validators.required],
      documentType: [this.personalInfo.documentType],
      spouseName: [this.personalInfo.spouseName],
      spouseNationality: [this.personalInfo.spouseNationality],
      spouseIdentityNo: [this.personalInfo.spouseIdentityNo],
      spouseDateOfExpiry: [this.personalInfo.spouseDateOfExpiry],
      spouseDateOfBirth: [this.personalInfo.spouseDateOfBirth],
    });

    this.route.queryParams.subscribe((params) => {
      if (params['singpass']) {
        this.authCodeForPersonAPI = params['code'];
        this.getPersonDetails(this.authCodeForPersonAPI);
      }
    });
  }
  next() {
    this.stepperService.next(9);
  }
  back() {
    this.stepperService.next(1);
  }
  selectOption(value: any) {
    if (this.personalInfoForm.value.maritalStatus == 1) {
      this.showSpouseInfo = false;
    } else {
      this.showSpouseInfo = true;
    }
  }
  getPersonDetails(authCode: any) {
    let request = {
      code: authCode,
    };
    this.apiServices.callTokenAPI(request).subscribe(
      (response) => {
        if (response) {
          this.personData = response.text;
          this.populateForm(response.text);
        }
      },
      (error) => { }
    );
  }

  populateForm(data: any) {
    this.formValues.uinfin = this.utilityService.str(data.uinfin);
    this.formValues.name = this.utilityService.str(data.name);
    this.formValues.aliasname = this.utilityService.str(data.aliasname);
    this.formValues.hanyupinyinname = this.utilityService.str(
      data.hanyupinyinname
    );
    this.formValues.hanyupinyinaliasname = this.utilityService.str(
      data.hanyupinyinaliasname
    );
    this.formValues.marriedname = this.utilityService.str(data.marriedname);
    this.formValues.sex = this.utilityService.str(data.sex);
    this.formValues.nationality = this.utilityService.str(data.nationality);
    this.formValues.dob = this.utilityService.str(data.dob);
    this.formValues.email = this.utilityService.str(data.email);
    this.formValues.mobileno =
      this.utilityService.str(data.mobileno.prefix) +
      this.utilityService.str(data.mobileno.areacode) +
      ' ' +
      this.utilityService.str(data.mobileno.nbr);
    this.formValues.marital = this.utilityService.str(data.marital);
  }

  onSubmit() {
    if (this.showSpouseInfo) {
      this.personalInfoForm.controls['spouseName'].setValidators([Validators.required])
      this.personalInfoForm.controls['spouseNationality'].setValidators([Validators.required])
      this.personalInfoForm.controls['spouseIdentityNo'].setValidators([Validators.required])
      this.personalInfoForm.controls['spouseDateOfExpiry'].setValidators([Validators.required])
      this.personalInfoForm.controls['spouseDateOfBirth'].setValidators([Validators.required])
      this.personalInfoForm.controls['documentType'].setValidators([Validators.required])
      this.personalInfoForm.controls["spouseName"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseNationality"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseIdentityNo"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseDateOfExpiry"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseDateOfBirth"].updateValueAndValidity();
      this.personalInfoForm.controls["documentType"].updateValueAndValidity();
    } else {
      this.personalInfoForm.controls['spouseName'].clearValidators();
      this.personalInfoForm.controls['spouseNationality'].clearValidators();
      this.personalInfoForm.controls['spouseIdentityNo'].clearValidators();
      this.personalInfoForm.controls['spouseDateOfExpiry'].clearValidators();
      this.personalInfoForm.controls['spouseDateOfBirth'].clearValidators();
      this.personalInfoForm.controls['documentType'].clearValidators();
      this.personalInfoForm.controls["spouseName"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseNationality"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseIdentityNo"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseDateOfExpiry"].updateValueAndValidity();
      this.personalInfoForm.controls["spouseDateOfBirth"].updateValueAndValidity();
      this.personalInfoForm.controls["documentType"].updateValueAndValidity();
      this.personalInfoForm.get('spouseName').setValue('');
      this.personalInfoForm.controls['spouseName'].reset();
      this.personalInfoForm.controls['spouseNationality'].reset()
      this.personalInfoForm.controls['spouseIdentityNo'].reset()
      this.personalInfoForm.controls['spouseDateOfExpiry'].reset()
      this.personalInfoForm.controls['spouseDateOfBirth'].reset()
      this.personalInfoForm.controls['documentType'].reset()
    }

    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value);
      this.personalInfo = this.personalInfoForm.value;
      this.next();
    } else {
      this.markFormGroupAsTouched(this.personalInfoForm);
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
