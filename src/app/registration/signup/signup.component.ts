import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { ValidationHelper } from 'src/app/shared/util/validationhelper';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { ApiServices } from 'src/app/services/auth.service';
import { SignupService } from '../services/signup.service';
import { SignupModel } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('nationality') nationality: ElementRef;
  @ViewChild('countryOfResidence') countryOfResidence: ElementRef;
  @ViewChild('refrelCode') refrelCode: ElementRef;
  @ViewChild('mobile') mobile: ElementRef;
  @ViewChild('email') email: ElementRef;

  signupForm: FormGroup;
  signupModel: SignupModel;
  formBuilder: any;
  constructor(
    private router: Router,
    public stepperService: StepperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiServices: ApiServices,
    private renderer: Renderer2,
    private signupService: SignupService
  ) {}

  customerId: any = '1234321';

  ngOnInit() {
    this.signupModel = new SignupModel('', '', '', '', '', '', '', '', ''); // Initialize the user model with default values

    this.signupForm = this.fb.group({
      name: [this.signupModel.name, Validators.required],
      nationality: [this.signupModel.nationality, Validators.required],
      countryOfResidence: [
        this.signupModel.countryOfResidence,
        Validators.required,
      ],
      residencialStatus: [
        this.signupModel.residencialStatus,
        Validators.required,
      ],
      refrelCode: [this.signupModel.refrelCode, Validators.required],
      mobile: [this.signupModel.mobile, Validators.required],
      email: [
        this.signupModel.email,
        [Validators.required, Validators.email],
      ],
      isUsCitizen: [this.signupModel.isUsCitizen, Validators.required],
      privacyPolicy: [this.signupModel.privacyPolicy, Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      if (params['singpass']) {
        this.stepperService.next(7);
      }
    });
  }

  getBasicDetails() {
    this.signupService
      .getBasicDetails(this.customerId)
      .subscribe((response: any[]) => {
        //bind response to the form
      });
  }

  next(): void {
    this.stepperService.next(2);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signupModel = this.signupForm.value;
      this.next();
    } else {
      this.markFormGroupAsTouched(this.signupForm);
      this.focusOnInvalidField();
      this.scrollToFirstInvalidField();
    }
  }

  focusOnInvalidField() {
    // if (this.signupForm.get('name').invalid) {
    //   this.nameInput.nativeElement.focus();
    // } else if (this.signupForm.get('nationality').invalid) {
    //   this.nationality.nativeElement.focus();
    // } else if (this.signupForm.get('countryOfResidence').invalid) {
    //   this.countryOfResidence.nativeElement.focus();
    // } else if (this.signupForm.get('refrelCode').invalid) {
    //   this.refrelCode.nativeElement.focus();
    // } else if (this.signupForm.get('mobile').invalid) {
    //   this.mobile.nativeElement.focus();
    // } else if (this.signupForm.get('email').invalid) {
    //   this.email.nativeElement.focus();
    // }
    // this.nameInput.nativeElement.focus();
    // this.nationality.nativeElement.focus();
    // this.countryOfResidence.nativeElement.focus();
    // this.refrelCode.nativeElement.focus();
    // this.mobile.nativeElement.focus();
    // this.email.nativeElement.focus();
  }

  scrollToFirstInvalidField() {
    const firstInvalidField = document.querySelector('.invalid-field');
    if (firstInvalidField) {
      firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        console.log(control);
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
