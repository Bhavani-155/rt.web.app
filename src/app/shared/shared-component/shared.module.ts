import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SucessMsgcomponent } from './sucess-msg.component';


@NgModule({
  declarations: [
    SucessMsgcomponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    SucessMsgcomponent
  ]
})
export class SharedModule { }
