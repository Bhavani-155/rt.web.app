import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StepperService } from 'src/app/services/stepper.service';
import { SingpassModelComponent } from '../singpass/singpass-model.component';
@Component({
  selector: 'app-document-home',
  templateUrl: './document-home.component.html',
  styleUrls: ['./document-home.component.scss'],
})
export class DocumentHomeComponent {
  activeSingpass: boolean = true;
  activeManual: boolean = false;
  constructor(
    private modalService: BsModalService,
    public stepperService: StepperService
  ) {}

  openModal() {
    const modalRef: BsModalRef = this.modalService.show(SingpassModelComponent);

    modalRef.content.closeModalEvent.subscribe(() => {
      modalRef.hide();
    });
  }
  clickEvent(val: any) {
    if (val === 'singpass') {
      this.activeSingpass = !this.activeSingpass;
      this.activeManual = false;
    } else {
      this.activeManual = !this.activeManual;
      this.activeSingpass = false;
    }
  }

  
  back()
  {
    this.stepperService.next(1);
  }

  next() {
    if (this.activeSingpass) {
      this.openModal();
    }
    if (this.activeManual) {
      this.stepperService.next(6);
    }
  }
}
