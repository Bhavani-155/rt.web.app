import { Component } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(public stepperService: StepperService) {}

  onSwipeLeft(event){

this.stepperService.next(this.stepperService.currentStep-1);
  }

  onSwipeRight(event){
    console.log("swipe right")

    this.stepperService.next(this.stepperService.currentStep+1);
      }
  // next(): void {
  //   this.stepperService.next();
  // }
}
