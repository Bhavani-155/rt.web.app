import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperService } from 'src/app/services/stepper.service';
import { OtpModel } from './otp.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  timeLeft: number = 60;
  currentTab: any = 'email';
  display: any = '00:00';
  isTabChanged: boolean = false;
  isVerified: boolean = false;
  time: any;
  canResend: boolean = false;
  otpModel: OtpModel;
  otpForm: FormGroup;
  // emailOtpForm: FormGroup;
  constructor(
    public stepperService: StepperService,
    public router: Router,
    public fb: FormBuilder
  ) {}
  ngOnInit() {
    this.timer(2);
    this.otpModel = new OtpModel();
    this.otpModel.phone = '9087654321';
    this.otpModel.email = 'xyz@gmail.com';
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });
  }
  tabChange(val: any, listner?: any) {
    let ele: any = document.getElementsByClassName('otp');
    if (listner == 'backspace') {
      if (ele[val - 1].value != '' && ele[val - 1].value) {
        ele[val - 1].value = '';
      } else {
        ele[val - 2].focus();
      }
    } else if (ele[val - 1].value != '' && ele[val - 1].value) {
      val < 6 ? ele[val].focus() : '';
    } else if (ele[val - 1].value && ele[val - 1].value == '') {
      ele[val - 2].focus();
    }
  }
  prev() {
    this.stepperService.next(1);
  }

 
  verifyOTP() {
    console.log(this.otpForm.valid)
    // if (this.otpForm.valid) {
      
      this.otpModel = this.otpForm.value;
      
      this.isVerified = true;
      clearInterval(this.time);
      this.otpForm.reset();
      this.timer(2);
      if (this.currentTab == 'mobile') {
        this.next();
      }
    // } else {
    //   this.markFormGroupAsTouched(this.otpForm);
    // }
   
    // this.changeTab('mobile');
  }
  changeTab(tab: any) {
    this.currentTab = tab;
    this.isTabChanged = true;
  }
  timer(minute: any) {
    let seconds: number = minute * 60;
    console.log(minute, seconds);
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.time = setInterval(() => {
      seconds--;
      if (seconds == 0) {
        this.canResend = true;
        clearInterval(this.time);
      }
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
    }, 1000);
  }
  otpChange(event: any, position: any) {
    let ele: any = document.getElementsByClassName('otp');
    let val = event.data;
    if (ele[position - 1].value && ele[position - 1].value != '') {
      ele[position - 1].value = '';
    }
    ele[position - 1].value = val;
    this.tabChange(position);
  }
  next() {
    this.stepperService.next(3);
  }
  onSubmit() {
    
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
