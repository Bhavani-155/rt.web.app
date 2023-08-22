import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  currentStep: number = 1;
  subTitle: string = 'Basic Info';
  title: string = 'Account Opening';
  barWidth: number = 0;

  getTotalSteps(): number {
    return 16;
  }

  updateBarWidth(currentStep: number) {
    this.currentStep = currentStep;
    const totalSteps = this.getTotalSteps();
    this.barWidth = (this.currentStep / totalSteps) * 100;
  }

  updateStepTitle() {
    const stepTitles = [
      'Basic Info',
      'Verification',
      'Create Account',
      'Account Created',
      // Add titles for other steps here
      'Add Signature',
    ];

    if (this.currentStep >= 1 && this.currentStep <= stepTitles.length) {
      this.subTitle = stepTitles[this.currentStep - 1];
    }

    this.title = 'Account Opening';
  }

  next(currentStep: number) {
    this.updateBarWidth(currentStep);
    this.updateStepTitle();

    switch (this.currentStep) {
      case 2:
        this.subTitle = 'Verification';
        break;
      case 3:
        this.subTitle = 'Create Account';
        break;
      case 4:
        this.subTitle = 'Account Created';
        break;
      case 5:
        this.subTitle = 'Choose Account Opening Method';
        break;
      case 6:
      case 7:
        this.subTitle = 'Upload Documents';
        break;
      case 8:
        this.subTitle = 'Personal Information';
        break;
      case 9:
        this.subTitle = 'Permanent Address & Mailing Address';
        break;
      case 10:
        this.subTitle = 'Financial Information & Assessment';
        break;
      case 11:
        this.subTitle = 'Investment Knowledge';
        break;
      case 12:
        this.subTitle = 'Customer Account Review';
        break;
      case 13:
        this.subTitle = 'Declaration';
        break;
      case 14:
        this.subTitle = 'Bank Details';
        break;
      case 15:
        this.subTitle = 'Regularity Information';
        break;
      case 16:
        this.subTitle = 'Add Signature';
        break;
        case 17:
        this.subTitle = 'Thank You For Registration';
        break;
      default:
        // Handle default case or other steps
        break;
    }
  }
}
