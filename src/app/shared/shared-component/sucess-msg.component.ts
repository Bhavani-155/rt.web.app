import { Component, Input, OnInit } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';
@Component({
  selector: 'app-sucess-msg',
  templateUrl: './sucess-msg.component.html',
})
export class SucessMsgcomponent implements OnInit {

  @Input() finalScreen;
  text:any = 'Account Created'
  ngOnInit() {
    if(this.finalScreen == 'redirectToDashboard'){
      this.text = 'Process Completed'
          }else{
            this.text = 'Account Created'
          }
  }
  constructor(public stepperService: StepperService) {}

  next() {
    console.log(this.finalScreen)
    if(this.finalScreen == 'redirectToDashboard'){
this.text = 'Process Completed'
    }else{
      this.stepperService.next(5);
      this.text = 'Account Created'
    }
    
  }
}
