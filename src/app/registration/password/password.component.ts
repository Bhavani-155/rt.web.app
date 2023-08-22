import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { PasswordModel } from './password.model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit{
  passwordModel: PasswordModel;
  passwordForm: FormGroup;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  constructor(
    private stepperService: StepperService,
    public fb : FormBuilder
  )
  {}
  ngOnInit() {
     this.passwordModel = new PasswordModel('bhavani@gmail.com','','');
     this.passwordForm = this.fb.group({
      userName: [this.passwordModel.userName, Validators.required],
      
      password: [this.passwordModel.password, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      confirmPassword: [
        this.passwordModel.confirmPassword,
        [Validators.required, Validators.pattern(this.passwordPattern)]
      ]
    }, {
      validator: this.passwordMatchValidator // Add custom validator
    });
    this.passwordForm.controls['userName'].disable();
  }

  next() {
    this.stepperService.next(4);
  }
  onSubmit() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      this.passwordModel = this.passwordForm.value;
      console.log(this.passwordForm);
      this.next();
    }else {
      this.markFormGroupAsTouched(this.passwordForm);
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
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

}
