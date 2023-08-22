import { Component } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';
@Component({
  selector: 'app-singpass-login',
  templateUrl: './singpass-login.component.html',
  styleUrls: ['./singpass.component.scss'],
})
export class SingpassLoginComponent {
  constructor(public stepperService: StepperService) {}
  next() {
    this.stepperService.next(5);
  }
}
